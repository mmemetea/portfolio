import { defineType, defineField } from "sanity";

export default defineType({
  name: "award",
  title: "Award",
  type: "document",
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "event",
      title: "Event",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Optional link to more details",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "event",
    },
  },
});
