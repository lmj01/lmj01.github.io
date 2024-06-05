import { p as parser$1, f as flowDb } from './flowDb-c1833063-Df5kDQr4.js';
import { f as flowRendererV2, g as flowStyles } from './styles-483fbfea-DDPjh658.js';
import { u as setConfig } from './index-Bd_FDXSq.js';
import './graph-KZW2Npeo.js';
import './layout-BnytXFfq.js';
import './index-01f381cb-BCBEZMaa.js';
import './clone-B-QllgkM.js';
import './edges-066a5561-Bqw9g7uz.js';
import './createText-ca0c5216-B9KlDTE8.js';
import './line-DUwhS6kk.js';
import './array-DJxSMw-N.js';
import './path-BZ3S9nBE.js';
import './channel-BxFDB0yY.js';

const diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};

export { diagram };
