import React from 'react'
import dynamic from 'next/dynamic'
import { Button, Input } from '@material-ui/core'
import styles from './WriteForm.module.scss'
import { Api } from '../../utils/api'

const Editor = dynamic(() => import('../Editor').then((m) => m.Editor), { ssr: false })

interface WriteFormProps {
  data?: any
}

export const WriteForm: React.FC<WriteFormProps> = () => {
  const [isLoading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [blocks, setBlocks] = React.useState([])

  const onAddPost = async () => {
    try {
      setLoading(true)
      const post = await Api().post.create({
        title,
        body: blocks,
      })
      console.log(post)
    } catch (err) {
      console.warn('Create post', err)
      alert(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder='Заголовок'
      />
      <div className={styles.editor}>
        <Editor onChange={(arr) => setBlocks(arr)} />
      </div>
      <Button disabled={isLoading} onClick={onAddPost} variant='contained' color='primary'>
        Опубликовать
      </Button>
    </div>
  )
}
