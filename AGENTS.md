# Agent instructions

## Commits and pull requests

- Commit messages and PR titles follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): `type(scope): description`, with `!` before the colon for a breaking change. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- PRs are squash-merged and the commit on `main` is the PR title alone, so the title is the commit message that stays.
- No coding-agent attribution anywhere: no `Co-authored-by:` trailer for Claude, Codex, Cursor, Copilot or any other assistant, and no "Generated with …" line, in commits, PR titles or PR descriptions. CI (`.github/workflows/pr-conventions.yml`) fails a PR that has one.

## Workflow

- `main` takes changes only through pull requests, with CI green; nobody pushes to it, agents included.
- Work in a worktree of your own, branched from `origin/main` (`git worktree add ../engenty-wizards-wordpress-<name> -b <type>/<name> origin/main`), never in the shared main checkout.
- Push the branch, open a pull request with `gh pr create`, and turn on auto-merge (`gh pr merge --auto --squash`) once the work is done; it merges when CI is green.
- Releases are pull requests too: one PR bumps the version in `engenty-wizards.php` (header and `ENGENTY_WIZARDS_VERSION`), `readme.txt`'s Stable tag and its changelog, titled `chore(release): vX.Y.Z`. After the merge, tag that commit on main and push the tag: `git fetch origin && git tag -a vX.Y.Z -m "chore(release): vX.Y.Z" origin/main && git push origin vX.Y.Z`; the tag builds the release zip.
