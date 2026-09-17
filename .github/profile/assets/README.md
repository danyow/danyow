# Profile artwork

This directory contains static presentation assets for the approved personal GitHub README, not a website content feed.

- `dusk-cover.webp`: 1120 × 418. Composited from the user-approved, 1448 × 1086 standalone dusk background and the white-silhouette avatar in the approved concept. The source background is the conversation artwork “群山湖畔的紫色暮光”. The native Chinese motto and name are intentionally not baked into the bitmap.
- `link-github.svg`, `link-website.svg`, `link-mirror.svg`: self-contained navigation labels; 132 × 38 intrinsic size, displayed at 104 × 30. The destinations are real links in the README, not embedded SVG actions.
- `manifest.json`: exact byte lengths and SHA-256 of each displayed asset, checked in CI.

The composition crops the background to its scenic upper 540 pixels, fades its lower edge into RGB (13,17,23), overlays the approved 216-pixel circular avatar centrally, then resizes to 1120 × 418 and exports WebP. No new portrait identity, generated quote attribution, project claim or account statistic is included.

The full-resolution standalone background was delivered separately in the conversation. Repository assets are presentation copies; the GitHub account avatar and profile privacy settings are not changed by these files.
