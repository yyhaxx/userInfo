<template>
	<div>
		<el-table
		  :data="tableData"
		  border>
		  <el-table-column
		    fixed
		    prop="date"
		    label="日期"
		    width="150">
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="姓名"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="province"
		    label="省份"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="city"
		    label="市区"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="address"
		    label="地址">
		  </el-table-column>
		  <el-table-column
		    prop="zip"
		    label="邮编"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    fixed="right"
		    label="操作"
		    width="200">
		    <template scope="scope">
		      <el-button type="info" size="small" @click="showInfo(scope.$index)">查看</el-button>
		      <el-button type="info" size="small" icon="edit" @click="editInfo(scope.$index)"></el-button>
		      <el-button type="danger" size="small" icon="delete" @click="delInfo(scope.$index)"></el-button>
		    </template>
		  </el-table-column>
		</el-table>
		<el-row :gutter="20">
		  <el-col :span="12" :offset="6">
		  	<el-button  @click="insertsInfo">增加用户</el-button>
		  </el-col>
		</el-row>

		<el-dialog :title=nowData.name v-model="dialogInfoVisible" :data="tableData[0]">
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">日期：</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">{{nowData.date}}</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">姓名：</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">{{nowData.name}}</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">省份：</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">{{nowData.province}}</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">市区：</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">{{nowData.city}}</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">地址：</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">{{nowData.address}}</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="6"><div class="grid-content bg-purple">邮编：</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple">{{nowData.zip}}</div></el-col>
			</el-row>
		</el-dialog>

		<el-dialog title="修改信息" v-model="dialogFormVisible">
		  <el-form :model="form">
		  	<el-input v-model="form._id" type="hidden"></el-input>
		    <el-form-item label="姓名" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="省份" :label-width="formLabelWidth">
		      <el-input v-model="form.province" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="城市" :label-width="formLabelWidth">
		      <el-input v-model="form.city" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="地址" :label-width="formLabelWidth">
		      <el-input v-model="form.address" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="邮编" :label-width="formLabelWidth">
		      <el-input v-model="form.zip" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="updateInfo(form._id)" v-show="updateSureBtn">确 定</el-button>
		    <el-button type="primary" @click="insertInfo(form._id)" v-show="insertSureBtn">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<style>
	.el-row {
	  margin-bottom: 20px;
	  margin-top: 20px;
	  &:last-child {
	    margin-bottom: 0;
	  }
	}
	.el-col {
	  border-radius: 4px;
	  text-align: center;
	}
</style>
<script>
	export default {
	  name: 'app',
	  methods: {
	    showInfo(idx) {
	    	this.dialogInfoVisible = true;
	    	this.nowData = this.tableData[idx];
	    },
	    editInfo(idx) {
	    	this.dialogFormVisible = true;
	    	this.updateSureBtn = true;
	    	this.insertSureBtn = false;
	    	this.form = this.tableData[idx];
	    },
	    updateInfo(idx) {
	    	this.$http.post('api/update/' + idx, this.form).then((res) => {
	    		
	    	})
	    	this.dialogFormVisible = false;
	    },
	    insertsInfo(){
	    	this.form = {};
	    	this.insertSureBtn = true;
	    	this.updateSureBtn = false;
	    	this.dialogFormVisible = true;
	    },
	    insertInfo(){
	    	this.$http.post('api/insert', this.form).then((res) => {
	    		this.tableData = res.body;
	    	})
	    	this.dialogFormVisible = false;
	    },
	    delInfo(idx){
	    	this.form = this.tableData[idx];
	    	let _id = this.form._id
	    	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.$http.delete('api/delete/' + _id).then((res) => {
        		if (res.body.msg == '1') {
	    				this.$message({
	    			    type: 'success',
	    			    message: '删除成功!'
	    			  })
        		}else{
      				this.$message({
      			    type: 'warning',
      			    message: '删除失败!'
      			  })
        		}
        		this.tableData = JSON.parse(res.body.datas)
        	})
        }).catch(() => {
        	this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
	    }
	  },
	  data() {
	    return {
	    	tableData: [],
	    	dialogInfoVisible: false,
	    	dialogFormVisible: false,
	    	updateSureBtn: false,
	    	insertSureBtn: false,
	    	nowData: '',
	    	form: {
	    		_id: '',
	    		name: '',
	    		province: '',
	    		city: '',
	    		address: '',
	    		zip: ''
	    	},
	    	formLabelWidth: '120px'
	    }
	  },
	  mounted:function () {
	  	this.$http.get('udata/info.json').then(function(data) {
	  		this.tableData = data.body;
	  	})
	  }

	}
</script>