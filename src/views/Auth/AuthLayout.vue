<template>
  <Row align="center" :gutter="[16, 16]">
    <Col :xs="24" :sm="18" :md="8">
      <RouterView />
    </Col>
  </Row>
</template>

<script setup>
import { Row, Col } from "ant-design-vue";
</script>
