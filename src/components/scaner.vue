<template>
    <video ref="testvideo"></video>
    <canvas width="100" height="100" ref="canvas"></canvas>
    <img :src="imgSrc" alt="" />
    <button @click="getImageTransformDiv">获取图片转换Div</button>
    <button @click="getImageTransformImage">获取图片转换image</button>
    <button @click="scanerCode">扫描二维码</button>
    <button @click="scampleVideo">采集</button>
    <!-- <button @click="playScan">播放采集</button>
    <button @click="uploadScan">上传采集</button> -->
    <!-- <video ref="testvideo1" controls src="../assets/tt.mp4"></video> -->
    <!-- <video id="rtmp">
        <source :src="source" type="rtmp/flv" />
    </video> -->
    <div id="container"></div>
</template>

<script>
import { ref, expose, onMounted } from "vue";
import videojs from "video.js";
import jsqr from "jsqr";
import logo from "../assets/back.webp";
import axios from "../api/index";
export default {
    setup() {
        const testvideo = ref(null);
        const testvideo1 = ref(null);
        const canvas = ref(null);
        const imgSrc = ref("");
        const source = ref("rtmp:10.112.36.115:1935/test/room1");
        imgSrc.value = logo;
        let video = {
            width: 100,
            height: 100,
            frameRate: { min: 20 },
            aspectRatio: 16 / 9,
        };
        let mediaRecorderTar;
        let dataTar = [];
        console.log(ImageData, "------n------");

        function scanerCode() {
            let video = {
                width: 100,
                height: 100,
                frameRate: { min: 20 },
                aspectRatio: 16 / 9,
            };
            if (
                navigator.userAgent.match(/Mobi/i) ||
                navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/iPhone/i)
            ) {
                // 当前设备是移动设备
                video.facingMode = {};
                video.facingMode.exact = "environment";
            }

            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video,
                })
                .then((res) => {
                    var options = {
                        audioBitsPerSecond: 11025,
                        videoBitsPerSecond: 11025,
                        mimeType: "video/webm;codecs=vp8",
                    };
                    testvideo.value.srcObject = res;
                    testvideo.value.onloadedmetadata = function (e) {
                        testvideo.value.play();
                        let ctx = canvas.value.getContext("2d");
                        let timer = setInterval(() => {
                            ctx.drawImage(testvideo.value, 0, 0, 100, 100);
                            let imagedata = ctx.getImageData(
                                0,
                                0,
                                100,
                                100
                            ).data;
                            let code = jsqr(imagedata, 100, 100);
                            if (code) {
                                console.log(code, "------------");
                                clearInterval(timer);
                                // let arr = new ArrayBuffer(code.binaryData);

                                let unit8 = new Uint8ClampedArray(44);
                                code.binaryData.forEach((item, index) => {
                                    unit8[index] = item;
                                });
                                console.log(unit8, "------------");
                                let gba = new ImageData(unit8, 1, 11);
                                let a = ctx.putImageData(gba, 0, 0);

                                alert("识别到二维码");
                            }
                        }, 5000);
                    };
                })
                .catch((err) => {
                    console.log(err, "------err------");
                });
        }
        function scampleVideo() {
            if (
                navigator.userAgent.match(/Mobi/i) ||
                navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/iPhone/i)
            ) {
                // 当前设备是移动设备
                video.facingMode = {};
                video.facingMode.exact = "environment";
            }

            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video,
                })
                .then((res) => {
                    var options = {
                        audioBitsPerSecond: 11025,
                        videoBitsPerSecond: 11025,
                        mimeType: "video/webm;codecs=vp8",
                    };
                    var mediaRecorder = new MediaRecorder(res, options);
                    mediaRecorder.ondataavailable = (res) => {
                        dataTar.push(res.data);
                        if (dataTar.length > 10) {
                            uploadScan(dataTar);
                            dataTar = [];
                        }
                    };
                    mediaRecorder.start(0);
                    testvideo.value.srcObject = res;
                })
                .catch((err) => {
                    console.log(err, "------err------");
                });
        }
        function stopScan() {
            mediaRecorderTar.stop();
        }
        function playScan() {
            let data = new Blob(dataTar, {
                type: "video/mp4",
            });
            let url = URL.createObjectURL(data);
            testvideo1.value.src = url;
        }
        function uploadScan(dataTar) {
            let data = new Blob(dataTar, {
                type: "application/mp4",
            });
            axios({
                url: "/uploadScan",
                method: "POST",
                data: { file: data },
                headers: { "Content-Type": "multipart/form-data" },
            });
        }
        function getImageTransformDiv() {
            let ctx = canvas.value.getContext("2d");
            ctx.drawImage(testvideo.value, 0, 0, 100, 100);
            let b = ctx.getImageData(0, 0, 100, 100);

            let a = [];
            let c = [];
            b.data.forEach((item, index) => {
                if ((index + 1) % 4 == 0) {
                    c.push(item);
                    a.push(c);
                    c = [];
                } else {
                    c.push(item);
                }
            });
            let dom = new DocumentFragment();
            let div1 = document.createElement("div");
            div1.className = "insderContainer";
            a.forEach((item, index) => {
                let div = document.createElement("div");

                div.style.width = "1px";
                div.style.height = "1px";
                div.style.float = "left";
                div.style.background = `rgba(${item[0]},${item[1]},${item[2]},${item[3]})`;
                if ((index + 1) % 100 == 0) {
                    div1.appendChild(div);
                    dom.append(div1);
                    div1 = document.createElement("div");
                    div1.className = "insderContainer";
                } else {
                    div1.appendChild(div);
                }
            });
            let div2 = document.createElement("div");
            div2.className = "container";
            div2.appendChild(dom);
            document.getElementById("container").appendChild(div2);
        }
        function getImageTransformImage() {
            let ctx = canvas.value.getContext("2d");
            ctx.drawImage(testvideo.value, 0, 0, 100, 100);
            canvas.value.toBlob((blob) => {
                imgSrc.value = URL.createObjectURL(blob);
            });
        }

        // onMounted(() => {
        //     videojs("rtmp", {
        //         // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        //         controls: true,
        //         // 自动播放
        //         autoplay: false,
        //         // 无法播放是显示信息
        //         notSupportedMessage: "无法播放",
        //         // 静音
        //         // muted: true,
        //         // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        //         preload: "false",
        //         // 设置视频播放器的显示宽度（以像素为单位）
        //         // width: '800px',
        //         // 设置视频播放器的显示高度（以像素为单位）
        //         // height: '450px',
        //         language: "zh",
        //         poster: "",
        //         playbackRates: [1, 2],
        //         controlBar: {
        //             // 设置控制条组件
        //             children: [
        //                 { name: "playToggle" }, // 播放按钮
        //                 { name: "currentTimeDisplay" }, // 当前已播放时间
        //                 { name: "progressControl" }, // 播放进度条
        //                 { name: "durationDisplay" }, // 总时间
        //                 { name: "liveDisplay" }, // 直播流时，显示LIVE
        //                 {
        //                     name: "volumePanel",
        //                     inline: false,
        //                 },
        //             ],
        //             FullscreenToggle: true, // 全屏
        //         },
        //     });
        //     // this.video.on("loadedmetadata", () => {
        //     //     // 视频源数据加载完成，loading可以关掉
        //     //     console.log("-----loadedmetadata-------");
        //     // });
        //     // this.video.on("error", () => {
        //     //     console.log("-----error-------");
        //     //     // 渲染播放画面
        //     // });
        // });
        let THREE = window.THREE;
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        // var geometry = new THREE.BoxGeometry(50, 70, 100); //创建一个立方体几何对象Geometry
        var geometry = new THREE.OctahedronGeometry(50);
        var material = new THREE.MeshStandardMaterial({
            color: 0x0000ff,
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh); //网格模型添加到场景中
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0x444444);
        point.position.set(1000, 600, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(
            -s * k,
            s * k,
            s,
            -s,
            1,
            1000
        );
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); //设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        renderer.render(scene, camera);
        return {
            testvideo,
            canvas,
            imgSrc,
            getImageTransformDiv,
            getImageTransformImage,
            stopScan,
            playScan,
            testvideo1,
            uploadScan,
            source,
            scanerCode,
            scampleVideo,
        };
    },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
#container {
  /* width: 100px; */
  height: 100px;
}
.insderContainer {
  float: left;
  width: 100px;
  height: 1px;
}
</style>
