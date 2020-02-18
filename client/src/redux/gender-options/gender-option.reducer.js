import image from './hat.jpg'
import womenJacket from './womenJacket.png'
import womenShoes from './womenShoes.png'
import menHats from './mensHats.png'
import menShirts from './menShirts.png'
import menShoes from './menShoes.png'

const INITIAL_STATE = {
  womensOptions: [
    {
      title: 'hats',
      imageUrl: image,
      id: 1,
      linkUrl: 'shop/womens/hats'

    },
    {
      title: 'tops',
      imageUrl: womenJacket,
      id: 2,
      linkUrl: 'shop/tops'
    },
    {
      title: 'shoes',
      imageUrl: womenShoes,
      id: 3,
      linkUrl: 'shop/women/shoes'
    },
  ],

  mensOptions: [
    {
      title: 'hats',
      imageUrl: menHats,
      id: 1,
      linkUrl: 'shop/mens/hats'

    },
    {
      title: 'shirts',
      imageUrl: menShirts,
      id: 2,
      linkUrl: 'shop/mens/shirts'
    },
    {
      title: 'shoes',
      imageUrl: menShoes,
      id: 3,
      linkUrl: 'shop/mens/shoes'
    },
  ]
}

const genderOptionReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default genderOptionReducer