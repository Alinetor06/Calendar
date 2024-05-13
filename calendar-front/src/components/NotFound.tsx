// NotFound.tsx
import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div>
            <h1>404 - Pagina non trovata</h1>
            <p>La pagina che stai cercando potrebbe essere stata rimossa, rinominata o non è disponibile al momento.</p>
            <p>Torna alla <a href="/">Home</a>.</p>
        </div>
    );
}

export default NotFound;