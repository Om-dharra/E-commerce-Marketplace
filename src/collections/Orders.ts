import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Orders:CollectionConfig = {
  slug: 'orders',
  access: {
    read:({req})=> isSuperAdmin(req?.user),
    create: ({ req })=> isSuperAdmin(req?.user),
    update: ({ req })=> isSuperAdmin(req?.user),
    delete: ({ req })=> isSuperAdmin(req?.user),

  },
  admin:{
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: true,
    },
    {
      name:"stripeCheckoutSessionId",
      type: 'text',
      required: true,
      admin: {
        description: 'Stripe Checkout Session ID for payment processing',
      },
    }
  ],
}
