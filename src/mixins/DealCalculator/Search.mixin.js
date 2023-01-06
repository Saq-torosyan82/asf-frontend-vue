import store from "@/store"
export default {
    data: function () {
        return {
            searchQuery: '',
            itemsToShow: null
        };
    },
    methods: {
        search(type) {
            let $this = this;
            if($this[type]) {
                if($this.searchQuery !== '') {
                    $this.itemsToShow = $this[type].filter(function(elem){
                        if(elem.name.toLowerCase().includes($this.searchQuery.toLowerCase())) return elem;
                    });
                }else {
                    $this.itemsToShow = $this[type];
                }
            }
        },
    }
}