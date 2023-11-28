import { $authHost } from '../axios'

const addToFavorite = async (product, setIsFavorite) => {
  try {
    await $authHost.post('/favorites/add', {
      productId: product._id,
    })

    await $authHost.patch('/product', {
      productId: product._id,
      updates: {
        favorite: true,
      },
    })
  } catch (error) {
    console.error('Произошла ошибка при отправке запроса:', error)
  }
}

const deleteInFavorite = async (product, setIsFavorite) => {
    try {
      await $authHost.delete('/favorite/remove', {
        data: { productId:  product._id },
      })
      await $authHost.patch('/product', {
        productId:  product._id,
        updates: {
          favorite: false,
        },
      })
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error)
    }
}

const deleteInCart = async (product, setProductCart, productCart) => {
    try {
      await $authHost.delete('/cart/remove', {
        data: { productId: product._id },
      })
      const newProductCart = productCart.filter(
        (item) => item._id !== product._id
      )
      setProductCart(newProductCart)
      localStorage.setItem('cart', JSON.stringify(newProductCart))
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error)
    }
  
}

export { addToFavorite, deleteInFavorite, deleteInCart }
