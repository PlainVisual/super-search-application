import React from 'react'
import Button from '../../components/buttons/button'

function FavoritesPage() {
  return (
    <>
    <div>FavoritesPage</div>
    <Button 
    btnType="button"
    goToPage="/profile"
    isDisabled= { false }
  >   
    Profile
  </Button>
  </>
  )
}

export default FavoritesPage