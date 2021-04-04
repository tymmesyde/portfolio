<template>
    <section :class="{ 'focused': focused }">
        <div class="content">
            <slot></slot>
        </div>
        <div class="background" :style="{ 'mask-image': 'url(img/' + background + '.svg)' }"></div>
    </section>
</template>

<script>
export default {
    name: 'Section',
    props: {
        background: String,
        focused: Boolean
    }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;

    .content {
        width: 100%;
        z-index: 98;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 10px 20px;
        overflow: hidden;
        opacity: 0;
        transition: all 0.5s ease-in-out;
    }

    .background {
        z-index: 97;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba($secondary-color, 0.5);
        mask-size: 500vh;
        opacity: 0.05;
        animation: roll 60s linear alternate infinite;
    }

    &.focused {
        .content {
            opacity: 1;
        }
    }

    @keyframes roll {
        0%{ 
            mask-position: 50% 50%;
        }
        100% {
            mask-position: 100% 100%;
        }
    }
}
</style>