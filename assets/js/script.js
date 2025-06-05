import React from 'react';
import { motion } from 'framer-motion';
import galetiprincipal from '../images/galetiprincipal.jpg'; // Certifique-se de que o caminho esteja correto

const ImagePopup = ({ onClose }) => {
    return (
        <motion.div
            initial={{ x: '-100%', opacity: 0 }} // Começa fora da tela (à esquerda)
            animate={{ x: 0, opacity: 1 }} // Animação para entrar na tela
            exit={{ x: '-100%', opacity: 0 }} // Sai para a esquerda
            transition={{ duration: 0.5 }} // Duração da animação
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fundo escuro
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000, // Garante que o pop-up fique acima de outros elementos
            }}


onClick={onClose} // Fecha o pop-up ao clicar fora da imagem
        >
            <motion.img
                src={galetiprincipal}
                alt="Galetiprincipal"
                style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    borderRadius: '10px',
                }}
            />
        </motion.div>
    );
};

export default ImagePopup;