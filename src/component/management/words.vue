<template>
    <div>
        <!-- <video controls="" autoplay="" name="media">
            <source src="https://translate.google.cn/translate_tts?ie=UTF-8&q=%E8%AE%BE%E5%A4%87&tl=zh-CN&total=1&idx=0&textlen=2&tk=93501.472274&client=t" type="audio/mpeg">
        </video> -->
        <el-table :data="tableData4" border class="tableWidth" @cell-click="clickEvent">
            <el-table-column fixed prop="Chinese" label="汉语" width="150" @cell-click="clickEvent">
            </el-table-column>
            <el-table-column prop="English" label="英语" width="200">
            </el-table-column>
            <el-table-column prop="Russian" label="俄语" width="230">
            </el-table-column>
            <el-table-column prop="Arabic" label="阿拉伯语" width="200">
            </el-table-column>
            <el-table-column prop="German" label="德语" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage4" layout="total,  prev, pager, next, jumper" :total="total" small class="pagination">
        </el-pagination>
        <div class="erWeiBox" v-show = "show">
            <el-input v-model="video" class="itemWidth" placeholder="请输入视频链接"></el-input>
            <el-input v-model="Chinese" class="itemWidth" placeholder="请输入汉语词"></el-input>
            <el-input v-model="Chinese_audio" class="itemWidth" placeholder="请输入汉语音频"></el-input>
            <el-input v-model="English" class="itemWidth" placeholder="请输入英语词"></el-input>
            <el-input v-model="English_audio" class="itemWidth" placeholder="请输入英语音频"></el-input>
            <el-input v-model="Russian" class="itemWidth" placeholder="请输入俄语词"></el-input>
            <el-input v-model="Russian_audio" class="itemWidth" placeholder="请输入俄语音频"></el-input>
            <el-input v-model="German" class="itemWidth" placeholder="请输入德语词"></el-input>
            <el-input v-model="German_audio" class="itemWidth" placeholder="请输入德语音频"></el-input>
            <el-button class="newButton" v-on:click="uploaderWei">添加新词</el-button>
        </div>
    </div>
</template>
<script>
import 'whatwg-fetch'

export default {
    methods: {
        uploaderWei() {
            fetch("/api/word/add/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Chinese: this.Chinese,
                    Chinese_audio: this.Chinese_audio,
                    English: this.English,
                    English_audio: this.English_audio,
                    German: this.German,
                    German_audio: this.German_audio,
                    Russian: this.Russian,
                    Russian_audio: this.Russian_audio,
                    video: this.video
                })
            }).then((res) => {
                return res.json()
            }).then(value => {
                this.tableData4.push({
                    "Chinese": this.Chinese,
                    "Chinese_audio": this.Chinese_audio,
                    "English": this.English,
                    "English_audio": this.English_audio,
                    "German": this.German,
                    "German_audio": this.German_audio,
                    "Russian": this.Russian,
                    "Russian_audio": this.Russian_audio,
                    "video": this.video
                })
                this.Chinese = ""
                this.Chinese_audio = ""
                this.English = ""
                this.English_audio = ""
                this.German = ""
                this.German_audio = ""
                this.Russian = ""
                this.Russian_audio = ""
                this.video = ""
                this.open2()
            })
        },
        clickEvent(row, column, cell, event) {
            // var audio = document.getElementById("audio")
            // var label = column.property + "_audio"
            // audio.src = row[label]
            // audio.play()
            console.log("row", row[column.property + "_audio"])
        },
        deleteRow(index, rows) {
            fetch("/api/word/delete/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: rows[index].word_id
                })
            }).then((res) => {
                return res.json()
            }).then(value => {
                rows.splice(index, 1);
                this.open1()
            })
        },
        open1() {
            this.$message({
                message: '恭喜你，删除成功！',
                type: 'success'
            });
        },
        open2() {
            this.$message({
                message: '恭喜你，增加成功！',
                type: 'success'
            });
        },
        handleCurrentChange(val) {
            var sort = window.location.pathname.split('-').pop()
            fetch('/api/word/list?type=' + sort + '&page=' + val).then(res => {
                return res.json()
            }).then(value => {
                this.tableData4 = value.words
                this.total = value.count
            })
        }
    },
    mounted() {
        this.handleCurrentChange(1)
        var sort = window.location.pathname.split('/')[1]
        if(sort != 'learn')
        	this.show = true
    },
    data() {
        return {
            tableData4: [],
            total: 23,
            Chinese: "",
            Chinese_audio: "",
            English: "",
            English_audio: "",
            German: "",
            German_audio: "",
            Russian: "",
            Russian_audio: "",
            video: "",
            show: false
        }
    }
}
</script>
<style scoped>
.tableWidth {
    width: 70%;
    margin: 40px auto;
}

.pagination {
    float: right;
    margin-right: 10%;
}

.itemWidth {
    margin-top: 40px;
    width: 30%;
}

.newButton {
    margin-top: 40px;
    margin-left: 40%;
}

.erWeiBox {
    margin-left: 25%;
    padding: 4%;
}
</style>
