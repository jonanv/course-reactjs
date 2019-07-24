import React from 'react';
import PropTypes from 'prop-types';
import styles from './login.css'

const propTypes = {
    onAuth: PropTypes.func.isRequired
}

function Login({ onAuth }) {
    return (
        <div className={styles.root}>
            <p className={styles.text}>
                Necesitamos que incies sesion con tu cuenta de GitHub
                para que puedas leer y escribir mensajes
            </p>
            <button
                onClick={onAuth}
                className={styles.button}
            >
                <span className="fab fa-github"></span> Login con GitHub
            </button>
        </div>
    );
}

Login.propTypes = propTypes;

export default Login;