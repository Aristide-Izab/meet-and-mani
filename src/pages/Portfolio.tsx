import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  GripVertical,
  ImagePlus,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

type PortfolioImage = {
  id: number
  file: File
  preview: string
}

function Portfolio() {
  const navigate = useNavigate()

  const [images, setImages] = useState<PortfolioImage[]>([])
  const [error, setError] = useState('')
  const [draggedImageId, setDraggedImageId] =
    useState<number | null>(null)

  const MAX_IMAGES = 6

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length === 0) {
      return
    }

    const remainingSlots = MAX_IMAGES - images.length

    if (remainingSlots <= 0) {
      setError(
        `You can upload a maximum of ${MAX_IMAGES} photos.`
      )
      return
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots)

    const startingId =
      images.length > 0
        ? Math.max(...images.map((image) => image.id)) + 1
        : 1

    const newImages: PortfolioImage[] = filesToAdd.map(
      (file, index) => ({
        id: startingId + index,
        file,
        preview: URL.createObjectURL(file),
      })
    )

    setImages((currentImages) => [
      ...currentImages,
      ...newImages,
    ])

    if (selectedFiles.length > remainingSlots) {
      setError(
        `Only ${MAX_IMAGES} photos can be uploaded.`
      )
    } else {
      setError('')
    }

    event.target.value = ''
  }

  const removeImage = (id: number) => {
    setImages((currentImages) => {
      const imageToRemove = currentImages.find(
        (image) => image.id === id
      )

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }

      return currentImages.filter(
        (image) => image.id !== id
      )
    })

    setError('')
  }

  const handleDragStart = (id: number) => {
    setDraggedImageId(id)
  }

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault()
  }

  const handleDrop = (targetId: number) => {
    if (
      draggedImageId === null ||
      draggedImageId === targetId
    ) {
      setDraggedImageId(null)
      return
    }

    setImages((currentImages) => {
      const draggedIndex = currentImages.findIndex(
        (image) => image.id === draggedImageId
      )

      const targetIndex = currentImages.findIndex(
        (image) => image.id === targetId
      )

      if (draggedIndex === -1 || targetIndex === -1) {
        return currentImages
      }

      const reorderedImages = [...currentImages]

      const [draggedImage] = reorderedImages.splice(
        draggedIndex,
        1
      )

      reorderedImages.splice(
        targetIndex,
        0,
        draggedImage
      )

      return reorderedImages
    })

    setDraggedImageId(null)
  }

  const handleDragEnd = () => {
    setDraggedImageId(null)
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (images.length === 0) {
      setError(
        'Please upload at least one photo of your work.'
      )
      return
    }

    console.log(
      'Portfolio images:',
      images.map((image) => image.file)
    )

    console.log(
      'Cover photo:',
      images[0].file
    )

    navigate('/nail-tech/availability')
  }

  return (
    <div className="min-h-screen bg-[#fffaf8]">
      {/* Header */}
      <header className="bg-white border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight text-[#a55c72]"
          >
            Meet&Mani
            <span className="text-[#dca7b6]">.</span>
          </Link>

          <p className="hidden sm:block text-sm text-gray-400">
            Nail Technician Setup
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <Link
          to="/nail-tech/services"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#a55c72] mb-10"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20 items-start">
          {/* Left */}
          <section className="lg:pt-10">
            <div className="inline-flex items-center gap-2 text-[#a55c72] text-sm font-medium mb-5">
              <Sparkles size={17} />
              SHOWCASE YOUR WORK
            </div>

            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
              Let your work
              <br />
              speak for{' '}
              <span className="italic text-[#b76f85]">
                itself.
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
              Your portfolio gives customers a glimpse of your
              creativity, style and the quality of your work.
            </p>

            <div className="bg-[#f9e9ed] rounded-3xl p-7 max-w-md">
              <Camera
                size={30}
                className="text-[#a55c72] mb-4"
              />

              <h3 className="font-serif text-2xl mb-2">
                Make a great first impression
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                Upload clear photos that represent your best work.
                Drag your photos into the order you want customers
                to see them.
              </p>
            </div>
          </section>

          {/* Portfolio */}
          <section className="bg-white border border-rose-100 rounded-[32px] p-7 sm:p-10 shadow-sm">
            {/* Progress */}
            <div className="mb-9">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs tracking-widest font-semibold text-[#a55c72]">
                  STEP 4 OF 5
                </p>

                <p className="text-xs text-gray-400">
                  Portfolio
                </p>
              </div>

              <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-[#a55c72] rounded-full" />
              </div>
            </div>

            <h2 className="font-serif text-3xl mb-2">
              Build your portfolio
            </h2>

            <p className="text-gray-500 mb-8">
              Upload up to {MAX_IMAGES} photos and drag them into
              your preferred order.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >
              {/* Upload */}
              {images.length < MAX_IMAGES && (
                <label className="block border-2 border-dashed border-[#e5c4ce] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#fff7f9] transition">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#f9e9ed] flex items-center justify-center">
                    <ImagePlus
                      size={25}
                      className="text-[#a55c72]"
                    />
                  </div>

                  <p className="font-medium mb-1">
                    Upload your work
                  </p>

                  <p className="text-sm text-gray-400 mb-3">
                    Choose photos from your device
                  </p>

                  <p className="text-xs text-gray-400">
                    JPG, PNG or WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Counter / drag instructions */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">
                    Portfolio photos
                  </p>

                  {images.length > 1 && (
                    <p className="text-xs text-gray-400 mt-1">
                      Drag photos to rearrange them.
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-400">
                  {images.length}/{MAX_IMAGES}
                </p>
              </div>

              {/* Portfolio grid */}
              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      draggable
                      onDragStart={() =>
                        handleDragStart(image.id)
                      }
                      onDragOver={handleDragOver}
                      onDrop={() =>
                        handleDrop(image.id)
                      }
                      onDragEnd={handleDragEnd}
                      className={`relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing transition-all ${
                        draggedImageId === image.id
                          ? 'opacity-40 scale-95'
                          : ''
                      } ${
                        index === 0
                          ? 'ring-2 ring-[#a55c72] ring-offset-2'
                          : ''
                      }`}
                    >
                      <img
                        src={image.preview}
                        alt={`Portfolio ${index + 1}`}
                        draggable={false}
                        className="w-full h-full object-cover select-none"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition pointer-events-none" />

                      {/* Drag handle */}
                      <div className="absolute top-3 left-3 w-9 h-9 bg-white/95 rounded-full shadow flex items-center justify-center text-gray-500 pointer-events-none">
                        <GripVertical size={17} />
                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        draggable={false}
                        onClick={() =>
                          removeImage(image.id)
                        }
                        aria-label={`Remove portfolio photo ${index + 1}`}
                        className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition"
                      >
                        <Trash2 size={17} />
                      </button>

                      {/* Cover */}
                      {index === 0 && (
                        <div className="absolute bottom-3 left-3 bg-white/95 text-[#a55c72] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm pointer-events-none">
                          Cover photo
                        </div>
                      )}

                      {/* Position */}
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs w-7 h-7 rounded-full flex items-center justify-center pointer-events-none">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-sm text-gray-400">
                    Your uploaded photos will appear here.
                  </p>
                </div>
              )}

              <div className="bg-[#fff7f9] rounded-2xl p-5">
                <p className="text-sm font-medium mb-2">
                  Arrange your portfolio
                </p>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Drag your photos into your preferred order. The
                  photo in position 1 automatically becomes your
                  cover photo and will be the main image customers
                  see on your profile.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#a55c72] hover:bg-[#87465b] text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >
                Continue to Availability
                <ArrowRight size={18} />
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Portfolio