import React from "react";
import './BlockStack.scss';

const BlockStack = ({direction, stack, required_count, count}) => {
    return (
        <div className="block_stack">
            <div>
                <p className="text_mln_f18_l18">{direction}</p>
            </div>
            <div>
                <p className="text_mln_f18_l18">{stack}</p>
            </div>
            <div>
                <p className="text_mln_f18_l18">{count}/{required_count}</p>
            </div>
            <div className="td"></div>
        </div>
    );
}

export default BlockStack;