import Index from './views/index/Index.vue'
import Detail from './views/detail/Detail.vue'

var router = [
	{
		name: 'index',
		path: '/',
    component: Index,
		title: 'Gao Pool'
  },
	{
		name: 'detail',
		path: '/detail',
    component: Detail,
		title: 'Gao Pool Detail'
  }
]

export default router;
