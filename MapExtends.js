(function() {
    /**
     * 返回一个标注点的像素坐标
     * @param {Object} marker 标注点
     *
     * @return {Object} 返回标注点的像素坐标
     */
    var getPixelOfMarker = function(map, marker){
        var pixel = map.pointToPixel(marker);
        pixel.count = marker.count;
        return pixel;
    }
    /**
     * 返回一个标注点的位置坐标
     * @param {Object} marker 标注点
     *
     * @return {Object} 返回标注点的位置坐标
     */
    var getPointOfMarker = function(map, marker){
        var point = map.pixelToPoint(marker);
        point.count = marker.count;
        return point;
    }
    /**
     * 判断给定的对象是否为数组
     * @param {Object} source 要测试的对象
     *
     * @return {Boolean} 如果是数组返回true，否则返回false
     */
    var isArray = function (source) {
        return '[object Array]' === Object.prototype.toString.call(source);
    };
    /**
     * 返回item在source中的索引位置
     * @param {Object} item 要测试的对象
     * @param {Array} source 数组
     *
     * @return {Number} 如果在数组内，返回索引，否则返回-1
     */
    var indexOf = function (item, source) {
        var index = -1;
        if (isArray(source)) {
            if (source.indexOf) {
                index = source.indexOf(item);
            } else {
                for (var i = 0, m; m = source[i]; i++) {
                    if (m === item) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };

    /**
     * MarkerClusterer
     * @class 用来解决加载大量点要素到地图上产生覆盖现象的问题
     * @constructor
     * @param {Map} map 地图的一个实例。
     * @param {Json Object} options 可选参数，可选项包括：<br />
     *    markers {Array<Marker>} 要聚合的标记数组<br />
     *    maxZoom {Number} 最大的聚合级别，大于该级别就不进行相应的聚合<br />
     *    minClusterSize {Number} 最小的聚合数量，小于该数量的不能成为一个聚合，默认为2<br />
     *    threshold {Nmuber} 判断两个标注点的外域是否相交的最小值
     */
    MarkerClusterer = function (map, options) {
        if (!map) {
            return;
        }
        this._map = map;
        this._markers = [];
        this._clusters = [];
        this._temp = [];
        var opts = options || {};
        this._maxZoom = opts["maxZoom"] || 18;
        this._minClusterSize = opts["minClusterSize"] || 2;
        this._threshold = opts["threshold"] || 60;

        // var that = this;
        // this._map.addEventListener("zoomend",function(){
        //     that._redraw();     
        // });

        // this._map.addEventListener("moveend",function(){
        //      that._redraw();     
        // });

        var mkrs = opts["markers"];
        isArray(mkrs) && this.addMarkers(mkrs);
    };
    /**
     * 添加要聚合的标记数组。
     * @param {Array<Marker>} markers 要聚合的标记数组
     *
     * @return 无返回值。
     */
    MarkerClusterer.prototype.addMarkers = function (markers) {
        for (var i = 0, len = markers.length; i < len; i++) {
            this._pushMarkerTo(markers[i]);
        }
        this._createClusters();
    };
    /**
     * 把一个标记添加到要聚合的标记数组中
     * @param {BMap.Marker} marker 要添加的标记
     *
     * @return 无返回值。
     */
    MarkerClusterer.prototype._pushMarkerTo = function (marker) {
        var index = indexOf(marker, this._markers);
        if (index === -1) {
            this._markers.push(marker);//Marker拖放后enableDragging不做变化，忽略
        }
    };

    /**
     * 根据所给定的标记，创建聚合点
     * @return 无返回值
     */
    MarkerClusterer.prototype._createClusters = function () {
        this._temp = [];
        for (var i = 0, len = this._markers.length; i < len; i++) {
            if (indexOf(i,this._temp) === -1) {
                var cluster = this._markers[i];
                for (var j = 0, lenj = this._markers.length; j < lenj; j++) {
                    if (this._markers[j] != {} && i != j) {
                        cluster = this._createCluster(cluster, this._markers[j]);
                    }
                }
                this._clusters.push(cluster);
            }
        }
    };
    MarkerClusterer.prototype._getClustersPoint = function () {
        var clusters = this._clusters;
        return clusters;
    }
    MarkerClusterer.prototype._createCluster = function (cluster, marker) {
        var clusterPixel = getPixelOfMarker(this._map, cluster);
        var markerPixel = getPixelOfMarker(this._map, marker);
        var x = Math.abs(clusterPixel.x - markerPixel.x);
        var y = Math.abs(clusterPixel.y - markerPixel.y);
        if (x < this._threshold && y < this._threshold) {
            var index = indexOf(marker, this._markers);
            if(index !== -1){
                this._temp.push(index);
            }
            cluster.count += marker.count;
        }
        return cluster;
    };

    /**
     * 重新生成，比如改变了属性等
     * @return 无返回值
     */
    MarkerClusterer.prototype.rebuild = function (threshold) {
        this._threshold = threshold;
        this._clusters = [];
        this._createClusters();
        return this._getClustersPoint();
    };

})();
