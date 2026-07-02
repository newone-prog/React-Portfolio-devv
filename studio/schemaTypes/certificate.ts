import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. 2026 or Jan 2026',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      options: {
        hotspot: true, // Allows user to select a crop
      },
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Name of the Lucide icon to use (e.g., Award, Cloud, MapPin). Defaults to Award.',
    }),
  ],
})
