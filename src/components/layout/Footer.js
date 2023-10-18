import React from 'react'
import classes from './Footer.module.css';
import { ReactComponent as IconGithub } from '../../assets/github.svg'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>Proyecto realizado por <a href='https://github.com/marroquin9953' target='_blank' rel='noreferrer'> Isidro Marroquin <IconGithub /></a></p>
    </footer>
  )
}

export default Footer