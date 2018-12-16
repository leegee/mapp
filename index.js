const bigXml = require('big-xml');
// const bigXml = require('./bigXml');


const reader = bigXml.createReader(
    './maps/gz_2010_us_050_00_5m.kml',
    /^(Placemark)$/, 
    {}
);

const geoid2kml = {};

let counted = {
    ok: 0,
    error: 0
};

reader.on('error', function(err) {
    console.error(err);
    counted.error ++;
    throw err;
});

reader.on('end', () => {
    parsed();
})

reader.on('record', (record) => {
    const geo_id = record.children
        .filter(o => o.tag === 'ExtendedData')
        .map(o => o.children)[0][0]
        .children
        .filter(o => o.tag === 'SimpleData' && o.attrs.name === 'GEO_ID')
        [0]
        .text
    ;

    console.log('Read geo_id', geo_id);

    const geometryNode = record.children.filter( 
        o => o.tag.match(/^(MultiGeometry|Polygon)$/)
    );
    
    // console.log( 'shape', polygon );
    
    if (typeof geometryNode === 'undefined') {
        console.error("ERROR no Polygon in record!", record);
        counted.error ++;
    } else {
        geoid2kml[geo_id] = geometryNode;
        counted.ok ++;
    }
});

const parsed = () => {
    let xml = '';

    Object.keys(geoid2kml).forEach( geoid => {
        console.log('Process ', geoid);
        xml += renderNodeAsXML( geoid2kml[geoid]);
    });

    console.log('END: ', counted);
    console.log('Created XML of ', xml.length);
}

const renderNodeAsXML = (nodes) => {
    let xml = '';
    nodes.forEach( node => {
        xml += processNode(node);
    });
    return xml;
}

const processNode = (node) => {
    let xml = '<' + node.tag + '>' + (node.text || '');
    if (node.attrs || node.attributes) {
        throw new Error('do more work');
    }
    if (node.children) {
        node.children.forEach( child => xml += processNode(child) );
    }
    return xml + '</' + node.tag + '>';
};
