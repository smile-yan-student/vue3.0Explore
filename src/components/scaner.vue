<template>
    <video ref="video"></video>
    <canvas width="100" height="100" ref="canvas"></canvas>
    <img :src="imgSrc" alt="" />
    <button @click="getImageTransformDiv">获取图片转换Div</button>
    <button @click="getImageTransformImage">获取图片转换image</button>
    <button @click="scaner">扫描二维码</button>
    <div id="container"></div>
</template>

<script>
import { ref, expose } from "vue";
import jsqr from "jsqr";
import logo from "../assets/back.webp";
export default {
    setup() {
        const testvideo = ref(null);
        const canvas = ref(null);
        const imgSrc = ref("");
        imgSrc.value = logo;
        let video = { width: 100, height: 100 };
        function scaner() {
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
                    audio: false,
                    video,
                })
                .then((res) => {
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
                                // alert(code.toString());

                                console.log(code, "------------");
                                clearInterval(timer);
                            }
                        }, 5000);
                    };
                })
                .catch((err) => {
                    console.log(err, "------err------");
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
        return {
            testvideo,
            canvas,
            imgSrc,
            getImageTransformDiv,
            getImageTransformImage,
            scaner,
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
