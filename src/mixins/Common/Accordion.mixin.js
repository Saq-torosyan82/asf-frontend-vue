export default {
    data() {
        return {
            accordion: [0]
        }
    },
    methods: {
        toggleBlock(index) {
            let $this = this;
            if(this.accordion.includes(index)) {
                this.accordion.map(function(item, key) {
                    if(item === index) {
                        $this.accordion.splice(key, 1);
                    }
                });
            }else {
                this.accordion.push(index);
            }
        },
    }
}