import Image from "next/image";
import localFont from "next/font/local";
import { Carousel } from "antd/lib";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <Image src="/icon.svg" alt="Logo" width={40} height={40} />
        <h1 className="text-xl font-bold">CarLoanCalc</h1>
      </div>
      <ul className="flex gap-6">
        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
        <li><a href="#features" className="hover:text-gray-300">Features</a></li>
        <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
      </ul>
    </nav>
  );
}

export default function Home() {
  const [hargaMobil, setHargaMobil] = useState<number>(0);
  const [hasilHargaMobil, setHasilHargaMobil] = useState<number>(0);
  const [dp, setDp] = useState<number>(0);
  const [hasilDp, setHasilDp] = useState<number>(0);
  const [tenor, setTenor] = useState<number>(0);
  const [hasilTenor, setHasilTenor] = useState<number>(0);
  const [bunga, setBunga] = useState<number>(20);
  const [jumlahAngsuran, setJumlahAngsuran] = useState<number>(0);

  const hitungJumlahAngsuran = () => {
    const bungaNominal = (hargaMobil * bunga) / 100;
    const hargaTotal = hargaMobil + bungaNominal;
    const dpNominal = (hargaMobil * dp) / 100;
    const tenorBulan = tenor * 12;

    const angsuranPerBulan = (hargaTotal - dpNominal) / tenorBulan;
    setJumlahAngsuran(angsuranPerBulan);
    setHasilHargaMobil(hargaMobil);
    setHasilDp(dp);
    setHasilTenor(tenor);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center min-h-screen`}
    >
      <Navbar /> 
      <main className="flex flex-col gap-8 w-full max-w-md sm:max-w-lg lg:max-w-xl items-center sm:items-start mt-10">
        <div className="font-[family-name:var(--font-geist-mono)] flex gap-4 sm:gap-10 items-center">
          <Image
            src="/icon.svg"
            alt="Next.js logo"
            width={50}
            height={50}
            priority
          />
          <h1 className="text-2xl sm:text-3xl font-bold">CarLoanCalc</h1>
        </div>
        <div className="w-full">
          <Carousel autoplay>
            <div>
              <img src="./banner/banner-wellcome.svg" alt="Welcome Banner" />
            </div>
            <div>
              <img
                src="./banner/fitur-komparasi.svg"
                alt="Comparison Feature"
              />
            </div>
            <div>
              <img
                src="./banner/fitur-konsultasi.svg"
                alt="Consultation Feature"
              />
            </div>
          </Carousel>
        </div>
        <ol className="flex flex-col sm:flex-row justify-center w-full list-inside list-decimal text-sm text-left sm:text-left font-[family-name:var(--font-geist-mono)] gap-4">
          <div className="w-full grid grid-cols-1 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <span>Harga mobil</span>
              <input
                type="text"
                className="text-black px-2 w-full sm:w-auto"
                value={hargaMobil}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHargaMobil(Number(e.target.value) || 0)
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-[90px]">
              <span>DP</span>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="text-black px-2 w-full sm:w-auto"
                  value={dp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDp(Number(e.target.value) || 0)
                  }
                />
                %
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-16">
              <span>Tenor</span>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="text-black px-2 w-full sm:w-auto"
                  value={tenor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTenor(Number(e.target.value) || 0)
                  }
                />
                Tahun
              </div>
            </div>
          </div>
        </ol>
        <div className="flex gap-4 items-center justify-end w-full">
          <button
            onClick={hitungJumlahAngsuran}
            className="border font-semibold border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base py-4 sm:py-1 px-4 sm:px-5"
          >
            Hitung
          </button>
        </div>

        {jumlahAngsuran > 0 && (
          <div className="text-start mt-4 w-full grid grid-cols-1 sm:grid-cols-2 font-[family-name:var(--font-geist-mono)] border-y border-white py-10 gap-6">
            <p>Harga Mobil</p>
            <p>Rp. {hasilHargaMobil.toLocaleString()}</p>
            <p>DP</p>
            <p>
              {hasilDp}% (Rp.{" "}
              {((hasilHargaMobil * hasilDp) / 100).toLocaleString()})
            </p>
            <p>Bunga</p>
            <p>{bunga}%</p>
            <p>Tenor</p>
            <p>{hasilTenor} tahun ({hasilTenor * 12} bulan)</p>
            <p className="mt-4 font-semibold">Jumlah Angsuran</p>
            <p className="mt-4 font-semibold">
              Rp. {jumlahAngsuran.toLocaleString()}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
