import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './editorTools';
import './editor.css';

export default function Editor({ data, onChange, holder }) {
  //add a reference to editor
  const ref = useRef();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div
      id={holder}
      className="prose flex min-w-full justify-center items-center m-3 bg-[#2B2B2B]"
    />
  );
}
