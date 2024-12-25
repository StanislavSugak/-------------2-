import React, { useEffect } from 'react';
import './BlockText.scss';

const BlockText = ({up, low}) => {
    return (
        <div className="block_text">
            <p className="text_mln_f20_l20">{up}</p>
            <p className="text_mln_f14_l14">{low}</p>
        </div>
    );
};

export default BlockText;   