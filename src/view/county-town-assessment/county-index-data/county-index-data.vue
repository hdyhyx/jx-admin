<style lang="less">
@import "./common.less";
</style>
<template>
  <div>
        <Row>
      <Card>
        <!-- 搜索 -->
          <Form ref="searchData" :model="searchData"  :label-width="100">
            <Row>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="选择显示" prop="superiorIndexId">
                      <Cascader :data="selectIndexType" change-on-select @on-change="selectIndex"></Cascader>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="指标搜索" prop="superiorIndexId">
                      <Cascader :data="selectIndexType" change-on-select @on-change="selectIndex"></Cascader>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="牵头单位">
                    <Input search placeholder="请输入搜索内容" v-model="searchData.leadUnit" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="责任单位">
                    <Input search placeholder="请输入搜索内容" v-model="searchData.responsibilityUnit" style="width: auto">
                        <Icon type="ios-search" slot="suffix" />
                    </Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="审核状态">
                    <Select v-model="searchData.audit" placeholder="请选择审核状态" style="width: 150px">
                        <Option value="5">全部</Option>
                        <Option value="4">未填写</Option>
                        <Option value="0">未审核</Option>
                        <Option value="1">责任人已审核</Option>
                        <Option value="2">管理员已审核</Option>
                        <Option value="3">退回</Option>
                    </Select>
                </FormItem>
              </i-col>
            <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="选择年份">
                  <DatePicker type="year" format="yyyy" @on-change="handlerFormat" placeholder="请选择指标年份" style="width:185px"></DatePicker>
                </FormItem>
              </i-col>
              <i-col :xs="24" :md="12" :lg="6" >
                <FormItem label="选择月份">
                    <Select v-model="searchData.monthTime" placeholder="请选择方向" style="width: 150px">
                        <Option value="01">1月</Option>
                        <Option value="02">2月</Option>
                        <Option value="03">3月</Option>
                        <Option value="04">4月</Option>
                        <Option value="05">5月</Option>
                        <Option value="06">6月</Option>
                        <Option value="07">7月</Option>
                        <Option value="08">8月</Option>
                        <Option value="09">9月</Option>
                        <Option value="10">10月</Option>
                        <Option value="11">11月</Option>
                        <Option value="12">12月</Option>
                    </Select>
                </FormItem>
              </i-col>
            </Row>
                <FormItem>
                 <!-- 10是pageSize,1当前页 -->
                  <Button :loading="submitloading" type="primary" @click="seachSubmit(10,1)">提交搜索</Button>
                  <Button @click="seachReset('searchData')" style="margin-left: 8px">重置</Button>
              </FormItem>
          </Form>
        </Card>
    </Row>
    <Row>
      <Card>
        <Table v-if="isTabelAllShow" border stripe :loading="isTabelAllLoading"  :columns="tabelShowAll" :data="IndexAll"></Table>
         <Table v-if=" isTabelInedxShow" border stripe :columns="tabelShowIndex" :data="data1"></Table>
        <div style="margin-top:20px;margin-left:40%">
            <Page @on-change="pageNumberChange" :current="pageCurrent" :page-size="pageSize"  :total="pageTotal" @on-page-size-change="pageSizeChange" show-elevator show-sizer />
        </div>
      </Card>
    </Row>
    <Drawer title="各乡镇数据" :mask-closable="false"  :styles="styles" width="100%"  v-model="isDrawerShow">
          <Form :model="formData">
            <Row :gutter="32">
                <Col span="10">
                    <FormItem label="一级指标" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter user name" />
                    </FormItem>
                </Col>
                <Col span="10">
                    <FormItem label="二级指标" label-position="top">
                        <Input v-model="formData.url" placeholder="please enter url"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="7">
                    <FormItem label="牵头单位" label-position="top">
                        <Select v-model="formData.owner" placeholder="please select an owner">
                            <Option value="jobs">Steven Paul Jobs</Option>
                            <Option value="ive">Sir Jonathan Paul Ive</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="7">
                    <FormItem label="责任单位" label-position="top">
                        <Select v-model="formData.type" placeholder="please choose the type">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </FormItem>
                </Col>,
                <Col span="6">
                    <FormItem label="权数" label-position="top">
                        <Select v-model="formData.type" placeholder="please choose the type">
                            <Option value="private">Private</Option>
                            <Option value="public">Public</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                   <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                        <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                        <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                           <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                         <Col span="3">
                    <Card style="width:100%">
                      <div class="title" style="text-align: center;margin-bottom:10px;">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                                <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                                <Col span="3">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row >
                              <Col span="12">
                                <FormItem>
                                  <Button type="primary" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Button type="success" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                       <Button type="error" style="width:100%">权数</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                      <Button type="warning" style="width:100%">权数是</Button>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card style="width:100%">
                      <div class="title">
                        塘前乡
                      </div>
                        <div class="content">
                            <Row>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>

                            </Row>
                            <Row style="height:72px">
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot" style="width:100%" color="primary">权数</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem>
                                  <Tag type="dot"  style="width:100%"  color="primary">得分</Tag>
                                  <Input></Input>
                                </FormItem>
                              </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <FormItem label="Description" label-position="top">
                <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="isDrawerShow = false">Cancel</Button>
            <Button type="primary" @click="isDrawerShow = false">Submit</Button>
        </div>
    </Drawer>
  </div>
</template>
<script>
import { getToken } from "@/libs/util";
import { countyAjax } from "@/api/city";
const token = getToken();
export default {
  data() {
    return {
      isTabelAllShow: true,
      isTabelAllLoading: true,
      isTabelInedxShow: false,
      isTabelInedxLoading: true,
      isDrawerShow: false,
      pageTotal: 0, // 总页数
      pageSize: 10, // 显示条数
      pageNumber: 1, // 页码
      pageCurrent: 1, // 当前页
      submitloading: false, // 提交Loading
      IndexAll: [],
      searchData: {
        responsibilityUnit: "",
        leadUnit: "",
        indexName: "", // 指标名称
        dateTime: "", // 年份
        monthTime: "", // 月份
        audit: "" // 审核状态
      },
      styles: {
        height: "calc(100% - 55px)",
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      searchReg: {
        seachLevel_1: [
          {
            required: true,
            message: "请选择审核结果",
            trigger: "change"
          }
        ]
      },
      formScore: {
        indexName: "",
        indexType: "",
        superiorIndexId: "",
        leadUnit: "",
        responsibilityUnit: "",
        weight: "",
        score: "",
        dateTime: "",
        塘前乡: 0, // 塘前
        葛岭镇: 0, // 葛岭
        樟城镇: 0, // 樟城
        城峰镇: 0, // 城峰
        清凉镇: 0, // 清凉
        福泉镇: 0, // 福泉
        岭路乡: 0, // 岭路
        赤锡乡: 0, // 赤锡
        梧桐镇: 0, // 梧桐
        嵩口镇: 0, // 嵩口
        洑口乡: 0, // 伏口
        盖洋乡: 0, // 盖洋
        长庆镇: 0, // 长庆
        东洋乡: 0, // 东洋
        霞拔乡: 0, // 霞拔
        同安镇: 0, // 同安
        大洋乡: 0, // 大洋
        盘谷乡: 0, // 盘谷
        红星镇: 0, // 红星
        白云乡: 0, // 白云
        丹云乡: 0 // 丹云
      },
      selectIndexType: [
        {
          value: "全部显示",
          label: "全部显示",
          children: [
            {
              value: "0",
              label: "权数"
            },
            {
              value: "1",
              label: "得分"
            },
            {
              value: "2",
              label: "得分率"
            },
            {
              value: "3",
              label: "排名"
            }
          ]
        },
        {
          value: " 二级指标",
          label: "二级指标",
          children: [
            {
              value: "0",
              label: "权数"
            },
            {
              value: "1",
              label: "得分"
            },
            {
              value: "2",
              label: "得分率"
            },
            {
              value: "3",
              label: "排名"
            }
          ]
        }
      ],
      formData: {
        name: "",
        url: "",
        owner: "",
        type: "",
        approver: "",
        date: "",
        desc: ""
      },
      tabelShowAll: [
        {
          title: "一级指标",
          key: "superiorIndexId",
          width: 150,
          fixed: "left"
        },
        {
          title: "二级指标",
          key: "indexName",
          width: 180,
          fixed: "left"
        },
        {
          title: "权数",
          key: "weight",
          width: 70
        },
        {
          title: "塘前",
          key: "塘前乡",
          width: 70
        },
        {
          title: "葛岭",
          key: "葛岭镇",
          width: 70
        },
        {
          title: "樟城",
          key: "樟城镇",
          width: 70
        },
        {
          title: "城峰",
          key: "城峰镇",
          width: 70
        },
        {
          title: "清凉",
          key: "清凉镇",
          width: 70
        },
        {
          title: "福泉",
          key: "福泉镇",
          width: 70
        },
        {
          title: "岭路",
          key: "岭路乡",
          width: 70
        },
        {
          title: "赤锡",
          key: "赤锡乡",
          width: 70
        },
        {
          title: "梧桐",
          key: "梧桐镇",
          width: 70
        },
        {
          title: "嵩口",
          key: "嵩口镇",
          width: 70
        },
        {
          title: "洑口",
          key: "洑口乡",
          width: 70
        },
        {
          title: "盖洋",
          key: "盖洋乡",
          width: 70
        },
        {
          title: "长庆",
          key: "长庆镇",
          width: 70
        },
        {
          title: "东洋",
          key: "东洋乡",
          width: 70
        },
        {
          title: "霞拔",
          key: "霞拔乡",
          width: 70
        },
        {
          title: "同安",
          key: "同安镇",
          width: 70
        },
        {
          title: "大洋",
          key: "大洋乡",
          width: 70
        },
        {
          title: "盘谷",
          key: "盘谷乡",
          width: 70
        },
        {
          title: "红星",
          key: "红星镇",
          width: 70
        },
        {
          title: "白云",
          key: "白云乡",
          width: 70
        },
        {
          title: "丹云",
          key: "丹云乡",
          width: 70
        },
        {
          title: "牵头单位",
          key: "leadUnit",
          width: 150
        },
        {
          title: "责任单位",
          key: "responsibilityUnit",
          width: 150
        },
        {
          title: "审核状态",
          key: "audit",
          width: 120,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            const row = params.row;
            var color = "";
            var text = "";
            switch (row.audit) {
              case "0":
                color = "warning";
                text = "未审核";
                break;
              case "1":
                color = "primary";
                text = "责任人审核";
                break;
              case "2":
                color = "success";
                text = "管理员审核";
                break;
              case "3":
                color = "error";
                text = "回退";
                break;
              default:
                color = "#9e9e9e"; // 未填写
                text = "未填写";
                break;
            }
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 获取时间
    handlerFormat(year) {
      this.searchData.year = year;
    },
    // 指标管理关联 on-change
    selectIndex(value) {
      console.log(value);
      this.searchData.seachLevel_1 = value[0];
      this.searchData.seachLevel_2 = value[1];
    },
    // 提交搜索
    seachSubmit(pageNumber, pageSize) {
      this.submitloading = true;
      this._addIndexCounty(token, this.searchData)
        .then(res => {
          if (res.code === "200") {
            this.submitloading = false;
            if (searchData) {
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 页码
    pageNumberChange(number) {
      this.pageNumber = number;
      this.seachSubmit(this.pageNumber, this.pageSize);
    },
    // 一页的个数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.seachSubmit(this.pageNumber, this.pageSize);
    },
    // 重置搜索
    seachReset(name) {
      this.$refs[name].resetFields();
      this.submitloading = false;
    },
    // 查询数据
    _getCountyList(token, form, pageNumber, pageSize) {
      const url = "/api/townIndicators/queryScore";
      const keyOne = "townIndicatorsFilter";
      let formData = Object.assign(form, {
        pageSize: pageSize,
        pageNumber: pageNumber
      });
      return new Promise((resolve, reject) => {
        countyAjax({ token, formData, url, keyOne }).then(res => {
          if (res.data.code === "200") {
            resolve(res.data);
          } else {
            reject(error);
          }
        });
      });
    },
    // 添加数据
    _addIndexCounty(token, formData) {
      const url = "/api/townIndicators/insert";
      const keyOne = "townIndicatorsEntity";
      const keyTwo = "townList";
      return new Promise((resolve, reject) => {
        countyAjax({ token, formData, url, keyOne, keyTwo }).then(res => {
          if (res.data.code === "200") {
            resolve(res.data);
          } else {
            reject(eer);
          }
        });
      });
    },
    // 更新修改
    _updateIndexCounty(token, formData) {
      const url = "/api/townIndicators/update";
      const keyOne = "townIndicatorsEntity";
      const keyTwo = "townList";
      return new Promise((resolve, reject) => {
        countyAjax({ token, formData, url, keyOne, keyTwo }).then(res => {
          if (res.data.code === "200") {
            resolve(res.data);
          } else {
            reject();
          }
        });
      });
    }
  },
  mounted() {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        name: "John Brown",
        street: "Lake Park",
        building: "C",
        door: 2035,
        caddress: "600",
        cname: "60"
      });
    }
    this.data10 = data;
  },
  created() {
    this._getCountyList(
      token,
      this.searchData,
      this.pageNumber, // 码数
      this.pageSize // 页数
    ).then(res => {
      // 现有的一级指标
      // res.results.firstIndex.forEach(item => {
      //   this.superiorIndexSelect.push(item.indexName);
      // });
      this.pageTotal = parseInt(res.results.pageTotal) * 10;
      this.IndexAll = res.results.list;
      this.isTabelAllLoading = false;
    });
  }
};
</script>
<style>
@import "./common.less";
</style>
