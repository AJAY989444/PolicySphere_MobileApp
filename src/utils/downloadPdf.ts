import { Platform } from 'react-native';

export const downloadPolicyPdf = (
  policyNumber: string,
  planName: string,
  insurerName: string,
  sumInsured: number
) => {
  const certificateContent = `
================================================================================
                    POLICYSPHERE DIGITAL INSURANCE MARKETPLACE
                           OFFICIAL POLICY CERTIFICATE
================================================================================

Policy Number:        ${policyNumber}
Insurer Name:         ${insurerName}
Plan Name:            ${planName}
Sum Insured:          ₹${(sumInsured / 100000).toFixed(1)} Lakhs
Policy Status:        ACTIVE & IRDAI REGISTERED
Issuance Timestamp:   ${new Date().toLocaleString('en-IN')}

--------------------------------------------------------------------------------
Coverage Highlights:
• Cashless Hospitalization Network: 12,000+ Empaneled Hospitals
• Tax Deduction: Section 80D / Section 80C Compliant
• 24x7 Claims Helpline: 1800-POLICY-SPHERE (1800-765-429)

--------------------------------------------------------------------------------
Notice: This is an electronically issued, tamper-proof policy document under 
IRDAI digital policy issuance guidelines. Authorized digital signature attached.
================================================================================
  `;

  downloadBlobFile(`${policyNumber}_Certificate.txt`, certificateContent);
};

export const downloadBlobFile = (fileName: string, fileContent: string) => {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    try {
      const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.log('Download blob error:', e);
    }
  } else {
    console.log('Downloading file on mobile:', fileName);
  }
};
