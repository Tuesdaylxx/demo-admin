var app = new Vue({
    el: "#app",
    data: {
        form: {
            name: '',
            wx: '',
            admin: '',
            department: '',
            role: '',
        },
        sumData: [{
            userID: '001',
            name: '王小虎',
            username: 'wangXiaoHu',
            admin: 'admin',
            department: '高三',
            role: '学生',
            wx: '已绑定'
        }, {
            userID: '002',
            name: '汤小圆',
            username: 'tangXiaoYuan',
            admin: 'admin',
            department: '高一',
            role: '学生',
            wx: '未绑定'
        }, {
            userID: '003',
            name: '代晟',
            username: 'daiSheng',
            admin: 'admin',
            department: '高一',
            role: '老师',
            wx: '已绑定'
        }, {
            userID: '004',
            name: '张三',
            username: 'zhangShan',
            admin: 'admin',
            department: '高二',
            role: '学生',
            wx: '已绑定'
        }, {
            userID: '005',
            name: '李四',
            username: 'liSi',
            admin: 'admin',
            department: '高一',
            role: '学生',
            wx: '未绑定'
        }, {
            userID: '006',
            name: '王二',
            username: 'wangEr',
            admin: 'admin',
            department: '高三',
            role: '老师',
            wx: '已绑定'
        }, {
            userID: '007',
            name: '麻子',
            username: 'maZi',
            admin: 'admin',
            department: '高一',
            role: '学生',
            wx: '已绑定'
        }, {
            userID: '008',
            name: '王小虎',
            username: 'wangXiaoHu',
            admin: 'admin',
            department: '高三',
            role: '学生',
            wx: '已绑定'
        }, {
            userID: '009',
            name: '汤小圆',
            username: 'tangXiaoYuan',
            admin: 'admin',
            department: '高一',
            role: '学生',
            wx: '未绑定'
        }, {
            userID: '010',
            name: '代晟',
            username: 'daiSheng',
            admin: 'admin',
            department: '高一',
            role: '老师',
            wx: '已绑定'
        }, {
            userID: '011',
            name: '张三',
            username: 'zhangShan',
            admin: 'admin',
            department: '高二',
            role: '学生',
            wx: '已绑定'
        }, {
            userID: '012',
            name: '李四',
            username: 'liSi',
            admin: 'admin',
            department: '高一',
            role: '学生',
            wx: '未绑定'
        }, {
            userID: '013',
            name: '王二',
            username: 'wangEr',
            admin: 'admin',
            department: '高三',
            role: '老师',
            wx: '已绑定'
        }, {
            userID: '014',
            name: '麻子',
            username: 'maZi',
            admin: 'admin',
            department: '高一',
            role: '学生',
            wx: '已绑定'
        },
        ],
        searchData: [],
        currentData: [],
        currentPage1: 1,
        currentNumber: 5,
        multipleSelection: []
    },

    methods: {
        getCurrentDate() {
            // 当前页 this.currentPage1 一页显示几条数据 this.currentNumber
            // 第一页 长度为5 0-5 ((1-1)×5+1)~1×5 为页数*显示几条数据
            let mixIndex = (this.currentPage1 - 1) * this.currentNumber
            let maxIndex = this.currentPage1 * this.currentNumber
            this.currentData = []
            // 遍历数组，筛选符合条件的
            for (let i = 0; i < this.searchData.length; i++) {
                if (i >= mixIndex && i < maxIndex) {
                    this.currentData.push(this.searchData[i])
                }
            }
        },
        onSubmit() {
            // 筛选出有查询条件的表单名['name','role']
            let arr = [];
            for (let k in this.form) {
                if (this.form[k] != '') {
                    arr.push(k)
                }
            }
            // 根据表单名将表单存入对象{name:'汤小圆',role:'学生'}
            function filterObj(obj, arr) {
                const result = {}
                Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
                    result[key] = obj[key]
                })
                return result
            }
            let newObj = filterObj(this.form, arr)
            if (Object.keys(newObj).length === 0) {
                this.$message({
                    message: '请输入查询内容',
                    type: 'warning',
                    center: true,
                });
                return
            }
            //根据查询对象查询数组
            //@param condition 过滤条件
            //@param data 需要过滤的数据
            let filter = (condition, data) => {
                return data.filter(item => {
                    return Object.keys(condition).every(key => {
                        return String(item[key]).toLowerCase().includes(
                            String(condition[key]).trim().toLowerCase())
                    })
                })
            }
            this.searchData = filter(newObj, this.sumData);
            // 分页数据
            this.getCurrentDate()
        },
        onReset() {
            this.form = {};
            this.searchData = []
            this.getCurrentDate()
        },
        handlePushAll() {
            this.$message({
                message: `成功推送 ${this.multipleSelection.length}个 `,
                type: 'success',
                center: true,
            });
        },
        handlePush(index, row) {
            this.$message({
                message: `${row.userID}  推送成功`,
                type: 'success',
                center: true,
            });
        },
        handleSizeChange(val) {
            this.currentNumber = val
            this.getCurrentDate()
        },
        handleCurrentChange(val) {
            this.currentPage1 = val
            this.getCurrentDate()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
})