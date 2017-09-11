<template>
    <div class="erWeiBox">
        <el-select v-model="value4" clearable placeholder="请选择" @change = "change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <el-table :data="table" border style="width: 100%" class="itemWidth">
             <el-table-column fixed prop="article_id" label="编号" width="70">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="article_url" label="链接" width="400">
            </el-table-column>
            <el-table-column prop="date" label="发布日期" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="70">
                <template scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, table)" type="text" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-input v-model="title" class="itemWidth" placeholder="请输入文章标题"></el-input>
        <el-input v-model="article_url" class="itemWidth" placeholder="请输入文章链接"></el-input>
        <el-input v-model="date" class="itemWidth" placeholder="请输入文章发布日期"></el-input>
        <el-button class="newButton" v-on:click="uploaderWei">添加文章</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            date: "",
            title: "",
            article_url: "",
            options: [{
                value: '1',
                label: '丝路资讯'
            }, {
                value: '2',
                label: '丝路专访'
            }, {
                value: '3',
                label: '高新技术'
            }],
            value4: '1',
            table: [],
            kindArray: ['丝路资讯', '丝路专访', '高新技术']
        }
    },
    mounted(){
        this.change()
    },
    methods: {
        deleteRow(index, rows) {
            fetch("/api/article/delete/", {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    article_id: rows[index].article_id
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
                message: '恭喜你，文章添加成功！',
                type: 'success'
            });
        },
        open2() {
            this.$message({
                message: '恭喜你，文章删除成功！',
                type: 'success'
            });
        },
        change() {
            fetch('/api/article/list?kind=' + this.value4 + '&page=1').then(value => {
                return value.json()
            }).then(value => {
                this.table = value.articles
            })
        },
        uploaderWei() {
            fetch("/api/article/add/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kind: parseInt(this.value4),
                    date: this.date,
                    title: this.title,
                    article_url: this.article_url
                })
            }).then((res) => {
                return res.json()
            }).then(value => {
                this.table.push({
                    "article_id":value.added,
                    "title":this.title,
                    "article_url": this.article_url,
                    "date":this.date
                })
                this.value4 = ""
                this.date = ""
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
