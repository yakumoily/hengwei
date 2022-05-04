import banner from '@/mock/mock.json'
import Mock from 'mockjs'
Mock.mock('/mock/banner', { code: 200, data: banner })
