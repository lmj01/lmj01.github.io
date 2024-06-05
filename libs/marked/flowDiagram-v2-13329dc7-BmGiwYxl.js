import { p as parser$1, f as flowDb } from './flowDb-c1833063-C_SlfbWJ.js';
import { f as flowRendererV2, g as flowStyles } from './styles-483fbfea-Bj8pmBPH.js';
import { u as setConfig } from './index-CN3YjQ0n.js';
import './graph-DadsyNmk.js';
import './layout-BOZlZI7g.js';
import './index-01f381cb-CDFlKdjO.js';
import './clone-B4k62NSz.js';
import './edges-066a5561-a6s42o55.js';
import './createText-ca0c5216-DF05SDfj.js';
import './line-D1aCvau7.js';
import './array-DJxSMw-N.js';
import './path-BZ3S9nBE.js';
import './channel-DcrZctv4.js';

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
