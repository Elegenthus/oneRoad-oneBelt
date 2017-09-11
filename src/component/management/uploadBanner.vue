<template>
    <div class="erWeiBox">
        <el-table :data="table" border max-height="400">
            <el-table-column fixed prop="carousel_id" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="title" label="文章标题" width="200">
            </el-table-column>
            <el-table-column prop="img_url" label="图片链接" width="400">
            </el-table-column>
            <el-table-column prop="article_url" label="文章链接" width="230">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, table)" type="text" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-input v-model="img_url" class="itemWidth" placeholder="请输入图片链接"></el-input>
        <el-input v-model="title" class="itemWidth" placeholder="请输入文章标题"></el-input>
        <el-input v-model="article_url" class="itemWidth" placeholder="请输入文章链接"></el-input>
        <el-button class="newButton" v-on:click="uploaderWei">上传轮播图</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img_url: "",
            title: "",
            article_url: "",
            table: []
        }
    },
    mounted() {
        fetch('/api/carousel/list?&page=1').then(value => {
            return value.json()
        }).then(value => {
            this.table = value.carousels
        })
    },
    methods: {
        deleteRow(index, rows) {
            fetch("/api/carousel/delete/", {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    carousel_id: rows[index].carousel_id
                })
            }).then((res) => {
                return res.json()
            }).then(value => {
                rows.splice(index, 1);
                this.open1()
            })
        },
        open2() {
            this.$message({
                message: '恭喜你，轮播图上传成功！',
                type: 'success'
            });
        },
        open1() {
            this.$message({
                message: '恭喜你，轮播图删除成功！',
                type: 'success'
            });
        },
        uploaderWei() {
            fetch("/api/carousel/add/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    img_url: this.img_url,
                    title: this.title,
                    article_url: this.article_url
                })
            }).then((res) => {
                return res.json()
            }).then(value => {
                this.table.push({
                    carousel_id:value.added,
                    title:this.title,
                    article_url:this.article_url,
                    img_url:this.img_url
                })
                this.img_url = ""
                this.title = ""
                this.article_url = ""
                this.open2()
            })
        }
    }
}
</script>
<style scoped>
.erWeiBox {
    margin-left: 20%;
    margin-top: 1%;
    padding: 5%;
}

.newButton,
.itemWidth {
    margin-top: 40px;
}
</style>