


    SKU -> [FIPS1, ...FIPSn]

    http://eric.clst.org/tech/usgeojson/

    https://github.com/mbloch/mapshaper

    An end point for each FIP?
        
        - webpack dynamic imports:

            import(/* webpackChunkCmds */ FIP[fip]); 

        - if FIP is defined, will that pre-generate?

    An end point for each SKU.

        - Map SKU to FIPS -> CSV -> JS

            - webpack? if the SKU-FIPs map is predefined

        - Use Node.js or webpack to pre-render statics

    An endpoint for each state:

        -  Use Node to separate each state with its counties into a state file.


Note: GEO_ID = 0500000USSSCCC, where SS is a zero-padded two digit state FIPS code, and CCC is a triple digit county FIPS code.

Use Leaflet to read the SKU.geo.json, taking SKU from URI as before.
