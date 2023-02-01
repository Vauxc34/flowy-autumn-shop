import React from "react";
import { motion } from "framer-motion";

const PrivacyAndPolicy = () => {
  return (
    <>
      <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="privacy">
        <div className="startup-screen">
          <div className="widget-description">
            <h1>Polityka prywatności i zasady</h1>

            <h3><h2>1.Lorem ipsum dolor sit amet</h2>
              consectetur adipiscing elit. Aliquam
              laoreet odio non semper scelerisque. Aliquam vel tellus nunc.
              Mauris maximus tristique sagittis. Integer ipsum justo, rhoncus
              sit amet purus vitae, vehicula dignissim turpis. Vestibulum at
              tortor sodales, feugiat sem non, lobortis felis. Vivamus venenatis
              erat ac iaculis iaculis. Donec eu dui rhoncus, blandit erat sit
              amet, porttitor metus. Aliquam erat volutpat. Aenean ultrices erat
              id metus blandit, sed varius mauris pretium. Pellentesque id
              vehicula nulla, at ultricies nibh. Maecenas tincidunt orci et
              massa euismod pretium. Morbi blandit ex vitae laoreet accumsan.
              Donec in nisl dui. Nullam magna lacus, dapibus quis ex sed,
              sagittis viverra tortor.
            </h3>
            <h3><h2>2.Lorem ipsum dolor sit amet</h2>
              consectetur adipiscing elit. Aliquam
              laoreet odio non semper scelerisque. Aliquam vel tellus nunc.
              Mauris maximus tristique sagittis. Integer ipsum justo, rhoncus
              sit amet purus vitae, vehicula dignissim turpis. Vestibulum at
              tortor sodales, feugiat sem non, lobortis felis. Vivamus venenatis
              erat ac iaculis iaculis. Donec eu dui rhoncus, blandit erat sit
              amet, porttitor metus. Aliquam erat volutpat. Aenean ultrices erat
              id metus blandit, sed varius mauris pretium. Pellentesque id
              vehicula nulla, at ultricies nibh. Maecenas tincidunt orci et
              massa euismod pretium. Morbi blandit ex vitae laoreet accumsan.
              Donec in nisl dui. Nullam magna lacus, dapibus quis ex sed,
              sagittis viverra tortor.
            </h3>
            <h3><h2>3.Lorem ipsum dolor sit amet</h2> consectetur adipiscing elit. Aliquam
              laoreet odio non semper scelerisque. Aliquam vel tellus nunc.
              Mauris maximus tristique sagittis. Integer ipsum justo, rhoncus
              sit amet purus vitae, vehicula dignissim turpis. Vestibulum at
              tortor sodales, feugiat sem non, lobortis felis. Vivamus venenatis
              erat ac iaculis iaculis. Donec eu dui rhoncus, blandit erat sit
              amet, porttitor metus. Aliquam erat volutpat. Aenean ultrices erat
              id metus blandit, sed varius mauris pretium. Pellentesque id
              vehicula nulla, at ultricies nibh. Maecenas tincidunt orci et
              massa euismod pretium. Morbi blandit ex vitae laoreet accumsan.
              Donec in nisl dui. Nullam magna lacus, dapibus quis ex sed,
              sagittis viverra tortor.
            </h3>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default PrivacyAndPolicy;
