<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Editable site content lives in the site_content table and is merged into the shared data in src/lib/site.ts by applyContent() in the root route; bundled values stay as fallback so the site works with an empty database.
- Uploaded images are stored privately and served through /api/public/img/* with long caching.
- Page editing: wrap page text in `<T k d>` and images in `<Img k d>` from src/lib/editable.tsx; the admin editor (/admin/pages/<page>) renders the same page component inside EditContext so fields become textboxes. Keys `services.N.*`/`faqs.N.*` map to the shared lists; other keys live in the `texts` row of site_content.
- Full-width section bands use the `.band` class (no max-width, no inline padding) with the content inside a `.container`, so a section's background reaches both viewport edges while its text stays aligned; `.container` carries a 1.5rem inline gutter because Bootstrap's wide `g-5` gutters pull a `.row` 24px past the default 12px container padding, which otherwise causes sideways scrolling on phones.
