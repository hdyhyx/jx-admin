<template>
  <div>
    <Row>
      <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="标题" prop="theTitle">
              <Input v-model="formValidate.theTitle" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="收件人" prop="unit" style="width:300px">
              <Select v-model="formValidate.unit" placeholder="请选择收件人">
                  <Option value="beijing">改发局</Option>
                  <Option value="shanghai">招商办</Option>
                  <Option value="shenzhen">电力局</Option>
              </Select>
          </FormItem>
          <FormItem label="附件">
            <Upload
                multiple
                action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传附件</Button>
            </Upload>
          </FormItem>
          <FormItem label="内容">
            <Input v-model="formValidate.text"  type="textarea" placeholder="Enter something..." />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {
        theTitle: '',
        unit: '',
        text: ''
      },
      ruleValidate: {
        theTitle: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }
        ],
        unit: [
          {
            required: true,
            message: '请选择收件人',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('发送成功！！');
        } else {
          this.$Message.error('带*必须填写!');
        }
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
