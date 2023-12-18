import { nextTick, onMounted, reactive, ref } from "vue";
import { CourseListParm } from '@/api/course/CourseModel'
import { listApi } from "@/api/course";
export default function useTable() {
    //表格高度
    const tableHeight = ref(0)
    //定义表格数据
    const tableDate = reactive({
        list:[]
    })
    //列表查询参数
    const listParm = reactive<CourseListParm>({
        courseName:'',
        teacherName:'',
        currentPage:1,
        pageSize:10,
        total:0
    })
    //查询列表
    const getList = async()=>{
        let res = await listApi(listParm)
        if(res && res.code == 200){
            console.log(res)
            tableDate.list = res.data.records;
            listParm.total = res.data.total;
        }
    }
    //页容量改变时触发
    const sizeChange = (size:number)=>{
        listParm.pageSize = size;
        getList()
    }
    //页数改变时触发
    const currentChange = (page:number)=>{
        listParm.currentPage = page;
        getList()
    }
    //搜索
    const searchBtn = ()=>{
        getList()
    }
    //重置
    const resetBtn = ()=>{
        listParm.courseName = ''
        listParm.teacherName = ''
        listParm.currentPage = 1;
        listParm.pageSize = 10
        getList()
    }
    //刷新表格
    const reFresh = ()=>{
        getList()
    }
    onMounted(()=>{
        nextTick(()=>{
            tableHeight.value = window.innerHeight - 230
        })
        getList()
    })
    return{
        listParm,
        tableDate,
        getList,
        sizeChange,
        currentChange,
        tableHeight,
        searchBtn,
        resetBtn,
        reFresh
    }
}