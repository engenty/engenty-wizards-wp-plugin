// Disposable served WordPress: verify attachment delivery and the HTML sandbox policy.
const assert = require( 'node:assert/strict' );
const { chromium } = require( process.env.PLAYWRIGHT_MODULE || 'playwright' );
const origin = process.env.WP_URL || 'http://127.0.0.1:8933';
const asset = `${ origin }/wp-json/engenty/v1/local/runs/r_browser/assets/d_test.html`;
( async () => {
	const browser = await chromium.launch( {
		channel: 'chrome',
		headless: true,
	} );
	try {
		const page = await browser.newPage();
		const response = await page.request.get( asset );
		assert.equal( response.status(), 200 );
		const headers = response.headers();
		assert.match( headers[ 'content-disposition' ], /^attachment;/ );
		assert.equal( headers[ 'x-content-type-options' ], 'nosniff' );
		assert.match(
			headers[ 'content-security-policy' ],
			/sandbox allow-scripts;/
		);
		assert.doesNotMatch(
			headers[ 'content-security-policy' ],
			/allow-same-origin/
		);
		const body = await response.body();
		assert.match( body.toString(), /parent\.document\.body\.remove/ );
		await page.route( `${ origin }/engenty-sandbox-test`, ( route ) =>
			route.fulfill( {
				contentType: 'text/html',
				body: `<html><body><p id="parent">Parent remains</p><iframe src="${ asset }"></iframe></body></html>`,
			} )
		);
		await page.goto( `${ origin }/engenty-sandbox-test` );
		await page.waitForTimeout( 300 );
		assert.equal( await page.locator( '#parent' ).count(), 1 );
		// Remove only download disposition in the harness to exercise the server's CSP directly.
		let blocked = false;
		page.on( 'pageerror', ( error ) => {
			if (
				/Blocked a frame|cross-origin|SecurityError/i.test(
					error.message
				)
			)
				blocked = true;
		} );
		await page.route( asset, ( route ) => {
			const inlineHeaders = { ...headers };
			delete inlineHeaders[ 'content-disposition' ];
			delete inlineHeaders[ 'content-length' ];
			return route.fulfill( {
				status: 200,
				headers: inlineHeaders,
				body,
			} );
		} );
		await page.reload();
		await page.waitForTimeout( 300 );
		assert.equal( await page.locator( '#parent' ).count(), 1 );
		assert.equal(
			blocked,
			true,
			'The opaque CSP origin must reject parent access'
		);
		const direct = await page.request.get(
			`${ origin }/wp-content/uploads/engenty-wizards/runs/r_browser/d_test.html`
		);
		assert.notEqual(
			await direct.text(),
			body.toString(),
			'The old public path must not deliver the private asset'
		);
		console.log(
			'PASS: private HTML is an attachment, has no public static URL, and CSP prevents parent document access.'
		);
	} finally {
		await browser.close();
	}
} )().catch( ( error ) => {
	console.error( error );
	process.exitCode = 1;
} );
