<template>
    <div class="scroll-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Scroller',
    emits: ['update:modelValue'],
    props: {
        modelValue: Number
    },
    data() {
        return {
            debouncer: null,
            isScrollingDown: true,
            lastScrollTop: 0
        }
    },
    computed: {
        children() {
            let children = [];
            for (const childNode of this.$el.childNodes) {
                if (childNode.nodeType !== 3) children.push(childNode);
            }
            return children;
        },
        currentChild() {
            return this.children[this.modelValue];
        }
    },
    watch: {
        modelValue() {
            this.scrollToCurrent();
        }
    },
    methods: {
        scrollToCurrent() {
            window.scrollTo({
                top: this.children[this.modelValue].offsetTop,
                behavior: 'smooth'
            });
        },
        onScroll() {
            clearTimeout(this.debouncer);
            this.debouncer = setTimeout(() => {
                this.isScrollingDown = window.scrollY > this.lastScrollTop;
                this.lastScrollTop = window.scrollY;

                this.setCurrentPosition();
            }, 100);
        },
        setCurrentPosition() {
            this.children.forEach((child, i) => {
                child.classList.remove('focused');

                let childOffsetBottom = child.offsetTop + child.offsetHeight;
                let windowScrollYBottom = window.scrollY + window.innerHeight;

                if (!this.isScrollingDown && window.scrollY >= child.offsetTop && window.scrollY < childOffsetBottom) this.$emit('update:modelValue', i);
                if (this.isScrollingDown && windowScrollYBottom > child.offsetTop && windowScrollYBottom <= childOffsetBottom) this.$emit('update:modelValue', i);
            });
            this.currentChild.classList.add('focused');
        }
    },
    mounted() {
        this.setCurrentPosition();
        window.onscroll = this.onScroll.bind(this);
    }
}
</script>