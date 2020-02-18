import mensImage from '../../assets/shopmens.jpg'
import womensImage from '../../assets/shopwomens.jpg'

const INITIAL_STATE = {
  sections: [
    // {
    //   title: 'hats',
    //   imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    //   id: 1,
    //   linkUrl: 'shop/hats',
    //   linkUrl: 'shop/hats'
    // },
    // {
    //   title: 'jackets',
    //   imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    //   id: 2,
    //   linkUrl: 'shop/jackets'
    // },
    // {
    //   title: 'sneakers',
    //   imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    //   id: 3,
    //   linkUrl: 'shop/sneakers'
    // },
    {
      title: 'womens',
      imageUrl: womensImage,
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens'
    },
    {
      title: 'mens',
      imageUrl: mensImage,
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    }
  ]
}

const directoryReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default directoryReducer