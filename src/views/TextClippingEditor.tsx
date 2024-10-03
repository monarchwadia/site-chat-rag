import React, { useEffect, useState, type ChangeEventHandler } from 'react';
import type { TextClipping } from '../storage/storage.types';

type Props = {
    value: TextClipping;
    onChange: (newValue: TextClipping) => void;
}
export const TextClippingEditor: React.FC<Props> = ({ value, onChange }) => {
    const text = value.text;
    const title = value.title;


    const handleSetText: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
        const text = evt.target.value;
        onChange({ ...value, text });
    }

    const handleSetTitle: ChangeEventHandler<HTMLInputElement> = (evt) => {
        const title = evt.target.value;
        onChange({ ...value, title });
    }

    return (
        <div className="flex flex-col">
            <input type="text" className="input" value={title} onChange={handleSetTitle} style={{ width: '100%', fontSize: '16px', padding: '10px' }} />

            <textarea
                className="textarea"
                value={text}
                onChange={handleSetText}
                rows={10}
                cols={50}
                style={{ width: '100%', fontSize: '16px', padding: '10px' }}
            />
        </div>
    );
};

