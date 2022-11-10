import axios from 'axios'
import * as zod from 'zod'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { toast } from 'react-toastify'

import { HomeProps } from '../@types/Home'
import { api } from '../lib/axios'

// IMPORT CSS
import 'react-toastify/dist/ReactToastify.css'

import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import logo from '../assets/logo.svg'
import iconCheckImg from '../assets/icon-check.svg'
import { Spinning } from '../components/Spinning'

const createPoolFormSchema = zod.object({
  poolTitle: zod.string().min(1, 'Não esquece o nome do bolão!!'),
})

type createPoolFormData = zod.infer<typeof createPoolFormSchema>

const expireTime = 60 * 60 * 24 // 24 horas

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const createPoolForm = useForm<createPoolFormData>({
    resolver: zodResolver(createPoolFormSchema),
    defaultValues: {
      poolTitle: '',
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = createPoolForm

  async function handleCreatePool(data: createPoolFormData) {
    try {
      const response = await api.post('/pools', {
        title: data.poolTitle,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      reset()

      toast(
        `${data.poolTitle}, foi criado com sucesso, o código foi copiado para a área de transferência`,
        {
          autoClose: 5000,
          className: 'toastBody',
        },
      )
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast(
          `Erro ${err.response.data.message}, rota não encontrada, Falha ao criar o bolão, tente novamente`,
          {
            autoClose: 2000,
            className: 'toastBody',
          },
        )
      }
    }
  }

  return (
    <div className="grid grid-cols-1 px-6 py-6 gap-28 items-center h-screen lg:grid lg:grid-cols-2 lg:max-w-[70.25rem] mx-auto">
      <main className="">
        <Image src={logo} alt="NLW Copa" />

        <h1 className="mt-14 text-2xl text-white md:text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        {userCount >= 1 && (
          <div className="flex items-center gap-2 mt-10">
            <Image src={usersAvatarExampleImg} alt="" />
            <strong className="text-gray-100 text-base md:text-xl">
              <span className="text-ignite-500">+{userCount}</span>
              {userCount === 1
                ? ' pessoa já está usando'
                : ' pessoas já estão usando'}
            </strong>
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleCreatePool)}
          className="flex flex-col mt-10"
        >
          <div className="flex flex-col w-full gap-2 md:flex-row">
            <input
              className={clsx(
                'flex-1 text-sm px-6 py-4 rounded bg-gray-800 border border-gray-600 text-gray-100 focus:outline-0 focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-150 ease-linear',
                {
                  'focus:outline-0 focus:border-red-400 focus:ring-red-400':
                    errors.poolTitle?.message,
                },
              )}
              type="text"
              placeholder="Qual nome do seu bolão?"
              {...register('poolTitle')}
            />
            <button
              className="bg-yellow-500 px-6 py-4 rounded text-gray-900 uppercase text-sm font-bold
            hover:bg-yellow-700 transition-all duration-150 ease-linear"
              type="submit"
            >
              {isSubmitting ? (
                <div className="flex items-center mx-auto px-[3.0625rem]">
                  <Spinning />
                </div>
              ) : (
                'Criar meu bolão'
              )}
            </button>
          </div>
          {errors.poolTitle?.message && (
            <span className="text-red-500 text-xs mt-2">
              {errors.poolTitle?.message}
            </span>
          )}
        </form>

        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div
          className="flex flex-col items-center justify-between gap-6 mt-10 pt-10 pb-10 border-t border-gray-600 text-gray-100
          md:flex md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>{poolCount === 1 ? 'Bolão criado' : 'Bolões criados'}</span>
            </div>
          </div>
          <div className="w-full h-px bg-gray-600 md:w-px md:h-14" />
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>
                {guessCount === 1 ? 'Palpite enviado' : 'Palpites enviados'}
              </span>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden md:flex md:mx-auto md:pb-8 lg:pb-0">
        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW copa"
          quality={100}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    revalidate: expireTime,
  }
}
