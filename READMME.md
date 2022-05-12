

# lapadi.app.detail()
# lapadi.app.paymentMethods()
# lapadi.app.shippingMethods()

# lapadi.app.content.list({
   app: { id: String }
    filter: {
      product: {
        pagination: { page: Int, per: Int }
        filter: {
          status: { path: [String] }
          category: { slug: String }
        }
      }
      category: {
        pagination: { page: 0, per: 10 }
        filter: { status: { path: ["active"] } }
      }
    }
})

# lapadi.app.content.show()

# lapadi.app.shop ----

# lapadi.app.shop.session({
  user: '',
  products: ''
})

# lapadi.app.shop.checkout()