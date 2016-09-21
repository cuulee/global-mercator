<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# latLngToMeters

Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913

**Parameters**

-   `lat` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `lng` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)

**Examples**

```javascript
latLngToMeters({lat: 45, lng: 90})
//=> Meters { mx: 10018754.171394622, my: 5621521.486192067 }
```

Returns **Meters** 

# metersToLatLng

Converts XY point from Spherical Mercator EPSG:900913 to lat/lng in WGS84 Datum

**Parameters**

-   `mx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `my` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** (Optional)

**Examples**

```javascript
metersToLatLng({mx: 10000000, my: 5500000})
//=> LatLng { lat: 44.2228902348575, lng: 89.83152841195214 }
```

Returns **LatLng** 

# metersToPixels

Converts EPSG:900913 to pyramid pixel coordinates in given zoom level

**Parameters**

-   `mx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `my` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

**Examples**

```javascript
metersToPixels({mx: 10000000, my: 5500000, zoom: 13})
//=> Pixels { px: 1571882.5818671728, py: 1336394.6200269451, zoom: 13 }
```

Returns **Pixels** 

# latLngToTile

Returns Tile for given latlng coordinates

**Parameters**

-   `lat` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `lng` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Tile** 

# latLngToGoogle

Returns Google Tile for given latlng coordinates

**Parameters**

-   `lat` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `lng` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Google** Google Tile

# metersToTile

Returns Tile for given mercator coordinates

**Parameters**

-   `mx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `my` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Tile** 

# pixelsToMeters

Converts pixel coordinates in given zoom level of pyramid to EPSG:900913

**Parameters**

-   `px` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `py` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Meters** 

# pixelsToTile

Returns a Tile covering region in given pixel coordinates

**Parameters**

-   `px` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `py` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Tile** 

# tileBounds

Returns bounds of the given Tile in EPSG:900913 coordinates

**Parameters**

-   `tx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `ty` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** bbox extent in [minX, minY, maxX, maxY] order

# tileLatLonBounds

Returns bounds of the given Tile in EPSG:900913 coordinates

**Parameters**

-   `tx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `ty` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** bbox extent in [minX, minY, maxX, maxY] order

# googleBounds

Converts Google Tile system in Mercator bounds (Meters)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** bbox extent in [minX, minY, maxX, maxY] order

# googleLatLonBounds

Converts Google Tile system in LatLng bounds (degrees)

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** bbox extent in [minX, minY, maxX, maxY] order

# tileGoogle

Converts TMS Tile coordinates to Google Tile coordinates

**Parameters**

-   `tx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `ty` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** bbox extent in [minX, minY, maxX, maxY] order

# googleTile

Converts Google Tile coordinates to TMS Tile coordinates

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **Tile** 

# googleQuadKey

Converts Google Tile coordinates to Microsoft QuadKey

**Parameters**

-   `x` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `y` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **quadkey** 

# tileQuadKey

Converts TMS Tile coordinates to Microsoft QuadKey

**Parameters**

-   `tx` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `ty` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `zoom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

Returns **quadkey** 

# quadKeyTile

Converts QuadKey to TMS Tile coordinates

**Parameters**

-   `quadkey` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **Tile** 

# quadKeyGoogle

Converts QuadKey to Google Tile

**Parameters**

-   `quadkey` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **Google** 

# boundsLatLngToMeters

Converts bounds from LatLng to Meters

**Parameters**

-   `bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** extent in [minX, minY, maxX, maxY] order

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** bounds

# validateUndefined

Validate Undefined

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `items` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

**Examples**

```javascript
validateUndefined('Meters', Object)
```

# validateTile

Validates Tile

**Examples**

```javascript
const tile = validateTile({tx: 60, ty: 80, zoom: 5})
//= {tx: 60, ty: 80, zoom: 5}
```

# validateZoom

Validates Zoom

**Examples**

```javascript
const zoom = validateZoom(12)
//= 12
```

# validatePixels

Validates Pixels

**Examples**

```javascript
const pixels = validatePixels([-115, 44])
//= [-115, 44]
```

# validateMeters

Validates Meters

**Examples**

```javascript
const meters = validateMeters([-115, 44])
//= [-115, 44]
```

# validateLatLng

Validates LatLng

**Examples**

```javascript
validateLatLng([-115, 44])
//= [-115, 44]
```

# validateLngLat

Validates LngLat

**Examples**

```javascript
validateLngLat([-115, 44])
//= [-115, 44]
```

# bounds

Validates bounds

**Examples**

```javascript
const bounds = validateBounds([ -75, 44, -74, 45 ])
//= [ -75, 44, -74, 45 ]
```
