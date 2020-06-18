import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Navegacion from './Navegacion';




const ContenedorHeader = styled.div`
    max-width:1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {


    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display:flex;
                        align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>


                    <Navegacion />
                </div>

                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}
                >

                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header