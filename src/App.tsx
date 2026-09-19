/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MergePDF } from './pages/MergePDF';
import { SplitPDF } from './pages/SplitPDF';
import { RotatePDF } from './pages/RotatePDF';
import { CompressPDF } from './pages/CompressPDF';
import { PdfToWord } from './pages/PdfToWord';
import { WordToPdf } from './pages/WordToPdf';
import { PdfToJpg } from './pages/PdfToJpg';
import { JpgToPdf } from './pages/JpgToPdf';
import { DeletePages } from './pages/DeletePages';
import { RearrangePages } from './pages/RearrangePages';
import { WatermarkPDF } from './pages/WatermarkPDF';
import { PageNumbers } from './pages/PageNumbers';
import { ProtectPDF } from './pages/ProtectPDF';
import { UnlockPDF } from './pages/UnlockPDF';
import { SignPDF } from './pages/SignPDF';
import { OcrPDF } from './pages/OcrPDF';
import { Compiler } from './pages/Compiler';
import { UniversalToolRunner } from './pages/UniversalToolRunner';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Home />} />
          <Route path="tools/merge" element={<MergePDF />} />
          <Route path="tools/split" element={<SplitPDF />} />
          <Route path="tools/rotate" element={<RotatePDF />} />
          <Route path="tools/compress" element={<CompressPDF />} />
          <Route path="tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="tools/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="tools/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="tools/delete-pages" element={<DeletePages />} />
          <Route path="tools/rearrange" element={<RearrangePages />} />
          <Route path="tools/watermark" element={<WatermarkPDF />} />
          <Route path="tools/page-numbers" element={<PageNumbers />} />
          <Route path="tools/protect" element={<ProtectPDF />} />
          <Route path="tools/unlock" element={<UnlockPDF />} />
          <Route path="tools/sign" element={<SignPDF />} />
          <Route path="tools/ocr" element={<OcrPDF />} />
          <Route path="compiler" element={<Compiler />} />
          <Route path="tools/compiler" element={<Compiler />} />
          <Route path="tools/:toolId" element={<UniversalToolRunner />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
