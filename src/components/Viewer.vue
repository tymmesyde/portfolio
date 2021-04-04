<template>
    <div class="viewer">
        <div ref="controlLeft" class="control left" @click="slideLeft()">
            <ion-icon name="chevron-back"></ion-icon>
        </div>
        <div ref="controlRight" class="control right" @click="slideRight()">
            <ion-icon name="chevron-forward"></ion-icon>
        </div>
        <div ref="container" class="container">
            <div class="item" v-for="item in items" :key="item.title">
                <div class="details">
                    <div class="title">{{ item.title }}</div>
                    <div class="description">{{ item.description }}</div>
                    <div class="links">
                        <a :href="item.link" target="blank">
                            <ion-icon name="logo-github"></ion-icon>
                        </a>
                    </div>
                </div>

                <div class="preview">
                    <div class="overlay"></div>
                    <img :src="item.preview" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Viewer',
    props: {
        items: Array
    },
    data() {
        return {
            debouncer: null,
            index: 0
        }
    },
    watch: {
        index() {
            this.slideTo();
        }
    },
    computed: {
        children() {
            let children = [];
            for (const childNode of this.$refs.container.childNodes) {
                if (childNode.nodeType !== 3) children.push(childNode);
            }
            return children;
        },
        slotWidth() {
            return this.$refs.container.children[0].clientWidth;
        }
    },
    methods: {
        init() {
            const offset = (this.$el.clientWidth - (this.slotWidth)) / 2;
            this.$refs.container.style.paddingLeft = `${offset}px`;

            const style = document.head.appendChild(document.createElement('style'));
            style.innerHTML = `.container::after { width: ${offset}px }`;

            this.$refs.controlLeft.style.width = `${this.slotWidth}px`;
            this.$refs.controlRight.style.width = `${this.slotWidth}px`;

            this.$refs.controlLeft.style.left = `${offset - this.slotWidth}px`;
            this.$refs.controlRight.style.right = `${offset - this.slotWidth}px`;

            this.slideTo();
        },
        onWheel(event) {
            event.preventDefault();

            clearTimeout(this.debouncer);
                this.debouncer = setTimeout(() => {
                
                if (event.deltaY < 0) this.slideLeft();
                if (event.deltaY > 0) this.slideRight();
            }, 100);
        },
        slideTo() {
            this.children.forEach(child => child.classList.remove('focused'));
            this.children[this.index].classList.add('focused');

            this.$refs.controlLeft.classList.remove('active');
            this.$refs.controlRight.classList.remove('active');
            if (this.index === 0) this.$refs.controlRight.classList.add('active');
            if (this.index === this.children.length - 1) this.$refs.controlLeft.classList.add('active');

            this.$refs.container.scrollTo({
                left: this.index * this.slotWidth,
                behavior: 'smooth'
            });
        },
        slideLeft() {
            if (this.index > 0) this.index--;
        },
        slideRight() {
            if (this.index < this.children.length - 1) this.index++;
        }
    },
    mounted() {
        this.init();
        window.onresize = () => this.init();

        this.$refs.container.onwheel = this.onWheel.bind(this);
    }
}
</script>

<style lang="scss" scoped>
.viewer {
    position: relative;
    width: 100%;

    .control {
        z-index: 99;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        padding: 0 75px;
        font-size: 50px;
        color: $secondary-color;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;

        &.left {
            justify-content: flex-end;
        }

        &.right {
            justify-content: flex-start;
        }

        &.active {
            opacity: 0.8;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }

    .container {
        height: 100%;
        display: flex;
        overflow: hidden;
        transform: translateZ(0);
        transition: transform 0.2s ease-in-out;

        &::after {
            content: "";
            flex-shrink: 0;
        }

        .item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            height: 50vh;
            width: 80vh;
            border-radius: 15px;
            overflow: hidden;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;

            &.focused {
                opacity: 1;
            }

            .details, .preview > .overlay {
                opacity: 0;
                transition: opacity 0.2s ease-in-out;
            }

            .details {
                .title {
                    font-family: 'Poppins-Bold';
                    font-size: 30px;
                    color: $secondary-color;
                }

                .description {
                    font-family: 'Montserrat-Medium';
                    font-size: 20px;
                    color: $secondary-color;
                }

                .links {
                    padding-top: 15px;
                    font-size: 45px;
                }
            }

            .preview {
                position: absolute;
                z-index: -1;
                height: 100%;

                .overlay {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: rgba($primary-color, 0.3);
                    backdrop-filter: blur(5px);
                    opacity: 0;
                }

                img {
                    height: 100%;
                }
            }

            &:hover {
                .details, .preview > .overlay {
                    opacity: 1;
                }
            }
        }

        @media only screen and (max-width: 768px) {
            .item {
                width: 100%;
            }

            .details, .preview > .overlay {
                opacity: 1 !important;
            }
        }
    }
}  
</style>