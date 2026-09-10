import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        description: fields.text({ label: "Short description", multiline: true }),
        fullDescription: fields.text({
          label: "Full description",
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        proofLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            url: fields.text({ label: "URL" }),
          }),
          {
            label: "Proof links",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        images: fields.array(
          fields.object({
            src: fields.text({
              label: "Image path (e.g. /projects/foo/bar.jpg)",
            }),
            alt: fields.text({ label: "Alt text" }),
          }),
          {
            label: "Images",
            itemLabel: (props) => props.fields.src.value,
          }
        ),
        videos: fields.array(
          fields.object({
            src: fields.text({ label: "Video path" }),
            poster: fields.text({ label: "Poster image path" }),
          }),
          {
            label: "Videos",
            itemLabel: (props) => props.fields.src.value,
          }
        ),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        bench: fields.checkbox({
          label: "Bench (maker build — shown separately)",
          defaultValue: false,
        }),
        order: fields.integer({ label: "Display order" }),
      },
    }),
  },
});
