import axios from 'axios'
import { useAppSelector } from '../app/hooks'
import { selectIdToken } from '../slices/editSlice'
import { TagTerms } from '../types/types'
import { useKeywords } from './useKeywords'

export const useAuto = () => {
  const idToken = useAppSelector(selectIdToken)
  const { getTags, putKeywords } = useKeywords()
  const suggestTags = (
    provider: string,
    questId: string,
    tags: string[],
    keywords: TagTerms
  ) => {
    const headers = {
      headers: {
        Authorization: idToken,
      },
    }
    axios
      .get(
        `${process.env.REACT_APP_REST_URL}/suggest?provider=${provider}&quest_id=${questId}`,
        headers
      )
      .then((response) => {
        const tagNos: string[] = response.data
        tagNos.forEach((tagNo) => {
          if (!tags.includes(tagNo)) {
            keywords[tagNo] = []
          }
        })
        putKeywords(getTags(keywords), keywords)
      })
  }
  
  // const findTags = (text: string, provider: string) => {
  //   if (provider === 'AWS') {
  //     return findAWS(text)
  //   } else {
  //     return []
  //   }
  // }
  // const findAWS = (text: string) => {
  //   const tags = []
  //   if (text.includes('VPC')) {
  //     tags.push('1')
  //   }
  //   if (text.includes('Direct Connect')) {
  //     tags.push('2')
  //   }
  //   if (
  //     text.includes('サブネット') ||
  //     text.includes('NACL') ||
  //     text.includes('ネットワークACL')
  //   ) {
  //     tags.push('3')
  //   }
  //   if (text.includes('セキュリティグループ')) {
  //     tags.push('4')
  //   }
  //   if (text.includes('EC2')) {
  //     tags.push('5')
  //   }
  //   if (text.includes('AMI')) {
  //     tags.push('6')
  //   }
  //   if (text.includes('Auto Scaling')) {
  //     tags.push('7')
  //   }
  //   if (
  //     text.includes('IAM') ||
  //     text.includes('ロール') ||
  //     text.includes('MFA')
  //   ) {
  //     tags.push('8')
  //   }
  //   if (text.includes('Load Balancer')) {
  //     tags.push('9')
  //   }
  //   if (text.includes('Route 53')) {
  //     tags.push('10')
  //   }
  //   if (text.includes('Cognito')) {
  //     tags.push('11')
  //   }
  //   if (text.includes('AWS SSO')) {
  //     tags.push('12')
  //   }
  //   if (text.includes('EBS')) {
  //     tags.push('13')
  //   }
  //   if (text.includes('EFS')) {
  //     tags.push('14')
  //   }
  //   if (text.includes('S3')) {
  //     tags.push('15')
  //   }
  //   if (text.includes('Snowball')) {
  //     tags.push('16')
  //   }
  //   if (text.includes('CloudFront')) {
  //     tags.push('17')
  //   }
  //   if (text.includes('RDS')) {
  //     tags.push('18')
  //   }
  //   if (text.includes('Aurora')) {
  //     tags.push('19')
  //   }
  //   if (text.includes('DynamoDB')) {
  //     tags.push('20')
  //   }
  //   if (text.includes('ElastiCache')) {
  //     tags.push('21')
  //   }
  //   if (text.includes('KMS') || text.includes('CMK')) {
  //     tags.push('22')
  //   }
  //   if (text.includes('CloudHSM')) {
  //     tags.push('23')
  //   }
  //   if (text.includes('Secrets Manager')) {
  //     tags.push('24')
  //   }
  //   if (text.includes('Certificate Manager')) {
  //     tags.push('25')
  //   }
  //   if (text.includes('Artifact')) {
  //     tags.push('26')
  //   }
  //   if (text.includes('Storage Gateway')) {
  //     tags.push('27')
  //   }
  //   if (text.includes('CodeCommit')) {
  //     tags.push('28')
  //   }
  //   if (text.includes('CodePipeline')) {
  //     tags.push('29')
  //   }
  //   if (text.includes('CodeBuild')) {
  //     tags.push('30')
  //   }
  //   if (text.includes('CodeDeploy')) {
  //     tags.push('31')
  //   }
  //   if (text.includes('Elastic Beanstalk')) {
  //     tags.push('32')
  //   }
  //   if (text.includes('ECS') || text.includes('ECR')) {
  //     tags.push('33')
  //   }
  //   if (text.includes('Systems Manager') || text.includes('Run Command')) {
  //     tags.push('34')
  //   }
  //   if (text.includes('CloudFormation')) {
  //     tags.push('35')
  //   }
  //   if (text.includes('OpsWorks')) {
  //     tags.push('36')
  //   }
  //   if (text.includes('SAM')) {
  //     tags.push('37')
  //   }
  //   if (text.includes('Lambda')) {
  //     tags.push('38')
  //   }
  //   if (text.includes('API Gateway')) {
  //     tags.push('39')
  //   }
  //   if (text.includes('Step Functions') || text.includes('SWF')) {
  //     tags.push('40')
  //   }
  //   if (text.includes('SQS')) {
  //     tags.push('41')
  //   }
  //   if (text.includes('SNS')) {
  //     tags.push('42')
  //   }
  //   if (text.includes('SES ')) {
  //     tags.push('43')
  //   }
  //   if (text.includes('Kinesis Data Streams')) {
  //     tags.push('44')
  //   }
  //   if (text.includes('Kinesis Firehose')) {
  //     tags.push('45')
  //   }
  //   if (text.includes('Kinesis Data Analytics')) {
  //     tags.push('46')
  //   }
  //   if (text.includes('Athena')) {
  //     tags.push('47')
  //   }
  //   if (text.includes('OpenSearch') || text.includes('Elasticsearch')) {
  //     tags.push('48')
  //   }
  //   if (text.includes('X-Ray')) {
  //     tags.push('49')
  //   }
  //   if (text.includes('CloudWatch') || text.includes('メトリクス')) {
  //     tags.push('50')
  //   }
  //   if (text.includes('CloudTrail')) {
  //     tags.push('51')
  //   }
  //   if (text.includes('Config')) {
  //     tags.push('52')
  //   }
  //   if (text.includes('Trusted Advisor')) {
  //     tags.push('53')
  //   }
  //   if (text.includes('WAF')) {
  //     tags.push('54')
  //   }
  //   if (text.includes('GuardDuty')) {
  //     tags.push('55')
  //   }
  //   if (text.includes('Inspector')) {
  //     tags.push('56')
  //   }
  //   if (text.includes('Amazon AI')) {
  //     tags.push('57')
  //   }
  //   if (text.includes('AWS Directory Service')) {
  //     tags.push('58')
  //   }
  //   if (text.includes('Organizations')) {
  //     tags.push('59')
  //   }
  //   if (text.includes('Health')) {
  //     tags.push('60')
  //   }
  //   if (text.includes('AWS CLI')) {
  //     tags.push('61')
  //   }
  //   if (text.includes('SDK') || text.includes('CDK')) {
  //     tags.push('62')
  //   }
  //   if (text.includes('Service Catalog')) {
  //     tags.push('63')
  //   }
  //   if (text.includes('EventBridge')) {
  //     tags.push('64')
  //   }
  //   if (text.includes('EKS')) {
  //     tags.push('65')
  //   }
  //   if (text.includes('Glue')) {
  //     tags.push('66')
  //   }
  //   if (text.includes('EMR')) {
  //     tags.push('67')
  //   }
  //   if (
  //     text.includes('Billing') ||
  //     text.includes('Cost Management') ||
  //     text.includes('Budgets')
  //   ) {
  //     tags.push('68')
  //   }
  //   if (text.includes('Migration')) {
  //     tags.push('69')
  //   }
  //   if (text.includes('AppSync')) {
  //     tags.push('70')
  //   }
  //   return tags
  // }
  return {
    suggestTags,
  }
}
